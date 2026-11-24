import { expect } from 'chai';
import { filterDump } from './dumpFilter.mjs';

/**
 * Le dump de production pèse 2,7 Go, dont 2,24 pour la seule table `rating`
 * (11,6 millions de lignes) et 414 Mo pour `subscription` (6,2 millions).
 * Charger tout ça pour développer est inutile et lent, mais tronquer à
 * l'aveugle ferait disparaître les tables utiles.
 *
 * Ce filtre est une fonction pure sur un flux de lignes : il garde tout le
 * schéma, toutes les petites tables, et plafonne les deux tables de mesure.
 */
const collecte = async (lignes, options) => {
  const sortie = [];
  for await (const ligne of filterDump(lignes, options)) sortie.push(ligne);
  return sortie;
};

const dumpFactice = [
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

describe('bin > filtre de dump', () => {
  describe('mode « schema »', () => {
    it('garde la structure et jette toutes les données', async () => {
      const sortie = await collecte(dumpFactice, { mode: 'schema' });

      expect(sortie.join('\n')).to.include('CREATE TABLE `contributor`');
      expect(sortie.join('\n')).to.include('ALTER TABLE `contributor`');
      expect(sortie.join('\n')).to.not.include('INSERT INTO');
      expect(sortie.join('\n')).to.not.include('(1),');
    });
  });

  describe('mode « full »', () => {
    it('ne retire rien', async () => {
      const sortie = await collecte(dumpFactice, { mode: 'full' });

      expect(sortie).to.deep.equal(dumpFactice);
    });
  });

  describe('mode « sample »', () => {
    it('garde entièrement les tables qui ne sont pas plafonnées', async () => {
      const sortie = await collecte(dumpFactice, {
        mode: 'sample',
        limit: 1,
        plafonnees: ['rating'],
      });

      expect(sortie.join('\n')).to.include('(1),');
      expect(sortie.join('\n')).to.include('(2);');
    });

    it('plafonne les tables désignées au nombre de lignes demandé', async () => {
      const sortie = await collecte(dumpFactice, {
        mode: 'sample',
        limit: 2,
        plafonnees: ['rating'],
      });
      const texte = sortie.join('\n');

      expect(texte).to.include('(10),');
      expect(texte).to.include('(11)');
      expect(texte).to.not.include('(12)');
    });

    it('ferme par un point-virgule la dernière ligne conservée', async () => {
      const sortie = await collecte(dumpFactice, {
        mode: 'sample',
        limit: 2,
        plafonnees: ['rating'],
      });

      // Sans cette fermeture, MySQL attend la suite de l'INSERT et échoue sur
      // la première instruction qui suit.
      expect(sortie).to.include('(11);');
    });

    it('laisse le schéma intact même pour une table plafonnée', async () => {
      const sortie = await collecte(dumpFactice, {
        mode: 'sample',
        limit: 0,
        plafonnees: ['rating'],
      });
      const texte = sortie.join('\n');

      expect(texte).to.include('CREATE TABLE `rating`');
      expect(texte).to.not.include('(10)');
    });
  });

  describe('mode « sample » sur un dump découpé', () => {
    // phpMyAdmin ne produit pas une instruction par table mais une par paquet :
    // le dump de production porte 46 750 `INSERT INTO `rating`` d'environ 248
    // lignes chacune. Un compteur remis à zéro à chaque instruction ne plafonne
    // donc rien du tout.
    const decoupe = [
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

    it('compte par table et non par instruction', async () => {
      const sortie = await collecte(decoupe, {
        mode: 'sample',
        limit: 3,
        plafonnees: ['rating'],
      });
      const texte = sortie.join('\n');

      expect(texte).to.include('(1),');
      expect(texte).to.include('(2);');
      expect(texte).to.include('(3);');
      expect(texte).to.not.include('(4)');
      expect(texte).to.not.include('(5)');
    });

    it("laisse tomber l'en-tête des instructions devenues inutiles", async () => {
      const sortie = await collecte(decoupe, {
        mode: 'sample',
        limit: 2,
        plafonnees: ['rating'],
      });
      const enTetes = sortie.filter((l) => l.startsWith('INSERT INTO'));

      expect(enTetes).to.have.lengthOf(1);
    });

    it('garde le schéma qui suit les données', async () => {
      const sortie = await collecte(decoupe, {
        mode: 'sample',
        limit: 1,
        plafonnees: ['rating'],
      });

      expect(sortie.join('\n')).to.include('ALTER TABLE `rating`');
    });
  });

  describe('garde-fous', () => {
    it('refuse un mode inconnu', async () => {
      let erreur = null;
      try {
        await collecte(dumpFactice, { mode: 'presque' });
      } catch (e) {
        erreur = e;
      }

      expect(erreur).to.be.an('error');
      expect(erreur.message).to.include('presque');
    });

    it('refuse une limite négative', async () => {
      let erreur = null;
      try {
        await collecte(dumpFactice, { mode: 'sample', limit: -1 });
      } catch (e) {
        erreur = e;
      }

      expect(erreur).to.be.an('error');
    });
  });
});
