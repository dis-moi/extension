import { expect } from 'chai';
import { lireOptions } from './dbRestoreOptions.mjs';

/**
 * Les options du chargement désignent une sauvegarde de production de 2,7 Go.
 * Une erreur silencieuse ici — un mode mal lu, une limite à NaN — se paie en
 * dizaines de minutes de chargement ou en base incomplète sans qu'on sache
 * pourquoi. D'où un analyseur isolé du reste, et testé.
 */
describe('bin > options du chargement de base', () => {
  const env = { DISMOI_DUMP: '/tmp/dump.sql' };

  it('tient le mode « sample » et 20 000 lignes pour défauts', () => {
    expect(lireOptions([], env)).to.deep.equal({
      mode: 'sample',
      limit: 20000,
      dump: '/tmp/dump.sql',
    });
  });

  it('lit la forme séparée par une espace', () => {
    const options = lireOptions(['--mode', 'full', '--limit', '500'], env);

    expect(options.mode).to.equal('full');
    expect(options.limit).to.equal(500);
  });

  it('lit la forme collée par un signe égal', () => {
    const options = lireOptions(['--mode=schema', '--limit=0'], env);

    expect(options.mode).to.equal('schema');
    expect(options.limit).to.equal(0);
  });

  it("préfère le chemin de l'argument à celui de l'environnement", () => {
    expect(lireOptions(['--dump', '/autre.sql'], env).dump).to.equal(
      '/autre.sql',
    );
  });

  it('refuse un argument inconnu plutôt que de le passer sous silence', () => {
    expect(() => lireOptions(['--vite'], env)).to.throw('--vite');
  });

  it('refuse un mode sans valeur', () => {
    // Sans ce garde-fou, `--mode` en fin de ligne donnait le mode `undefined`,
    // signalé seulement plus tard par le filtre.
    expect(() => lireOptions(['--mode'], env)).to.throw('--mode');
  });

  it('refuse une limite qui n’est pas un entier', () => {
    expect(() => lireOptions(['--limit', 'beaucoup'], env)).to.throw(
      'Limite invalide',
    );
  });

  it("refuse l'absence de chemin de dump", () => {
    expect(() => lireOptions([], {})).to.throw('DISMOI_DUMP');
  });
});
