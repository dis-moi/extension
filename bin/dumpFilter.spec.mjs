import { expect } from 'chai';
import { filterDump } from './dumpFilter.mjs';

const collect = async (lines, options) => {
  const output = [];
  for await (const line of filterDump(lines, options)) output.push(line);
  return output;
};

const dump = [
  'SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";',
  'CREATE TABLE `contributor` (',
  '  `id` int NOT NULL',
  ') ENGINE=InnoDB;',
  'INSERT INTO `contributor` (`id`) VALUES',
  '(1),',
  '(2);',
  'CREATE TABLE `rating` (',
  '  `id` int NOT NULL',
  ') ENGINE=InnoDB;',
  'INSERT INTO `rating` (`id`) VALUES',
  '(10),',
  '(11),',
  '(12);',
  'ALTER TABLE `contributor` ADD PRIMARY KEY (`id`);',
];

describe('bin > dump filter', () => {
  describe('schema mode', () => {
    it('keeps the structure and drops every row', async () => {
      const output = await collect(dump, { mode: 'schema' });

      expect(output.join('\n')).to.include('CREATE TABLE `contributor`');
      expect(output.join('\n')).to.include('ALTER TABLE `contributor`');
      expect(output.join('\n')).to.not.include('INSERT INTO');
      expect(output.join('\n')).to.not.include('(1),');
    });
  });

  describe('full mode', () => {
    it('removes nothing', async () => {
      const output = await collect(dump, { mode: 'full' });

      expect(output).to.deep.equal(dump);
    });
  });

  describe('sample mode', () => {
    it('keeps the tables that are not capped whole', async () => {
      const output = await collect(dump, {
        mode: 'sample',
        limit: 1,
        capped: ['rating'],
      });

      expect(output.join('\n')).to.include('(1),');
      expect(output.join('\n')).to.include('(2);');
    });

    it('caps the named tables at the requested number of rows', async () => {
      const output = await collect(dump, {
        mode: 'sample',
        limit: 2,
        capped: ['rating'],
      });
      const text = output.join('\n');

      expect(text).to.include('(10),');
      expect(text).to.include('(11)');
      expect(text).to.not.include('(12)');
    });

    it('closes the last row kept with a semicolon', async () => {
      const output = await collect(dump, {
        mode: 'sample',
        limit: 2,
        capped: ['rating'],
      });

      expect(output).to.include('(11);');
    });

    it('leaves the schema intact even for a capped table', async () => {
      const output = await collect(dump, {
        mode: 'sample',
        limit: 0,
        capped: ['rating'],
      });
      const text = output.join('\n');

      expect(text).to.include('CREATE TABLE `rating`');
      expect(text).to.not.include('(10)');
    });
  });

  describe('sample mode on a batched dump', () => {
    const batched = [
      'CREATE TABLE `rating` (',
      '  `id` int NOT NULL',
      ') ENGINE=InnoDB;',
      'INSERT INTO `rating` (`id`) VALUES',
      '(1),',
      '(2);',
      'INSERT INTO `rating` (`id`) VALUES',
      '(3),',
      '(4);',
      'INSERT INTO `rating` (`id`) VALUES',
      '(5);',
      'ALTER TABLE `rating` ADD PRIMARY KEY (`id`);',
    ];

    it('counts per table and not per statement', async () => {
      const output = await collect(batched, {
        mode: 'sample',
        limit: 3,
        capped: ['rating'],
      });
      const text = output.join('\n');

      expect(text).to.include('(1),');
      expect(text).to.include('(2);');
      expect(text).to.include('(3);');
      expect(text).to.not.include('(4)');
      expect(text).to.not.include('(5)');
    });

    it('drops the header of the statements that became useless', async () => {
      const output = await collect(batched, {
        mode: 'sample',
        limit: 2,
        capped: ['rating'],
      });
      const headers = output.filter((line) => line.startsWith('INSERT INTO'));

      expect(headers).to.have.lengthOf(1);
    });

    it('keeps the schema that follows the rows', async () => {
      const output = await collect(batched, {
        mode: 'sample',
        limit: 1,
        capped: ['rating'],
      });

      expect(output.join('\n')).to.include('ALTER TABLE `rating`');
    });
  });

  describe('guards', () => {
    it('refuses an unknown mode', async () => {
      let error = null;
      try {
        await collect(dump, { mode: 'almost' });
      } catch (thrown) {
        error = thrown;
      }

      expect(error).to.be.an('error');
      expect(error.message).to.include('almost');
    });

    it('refuses a negative limit', async () => {
      let error = null;
      try {
        await collect(dump, { mode: 'sample', limit: -1 });
      } catch (thrown) {
        error = thrown;
      }

      expect(error).to.be.an('error');
    });
  });
});
