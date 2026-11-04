import { expect } from 'chai';
import React, { act } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { StatefulContributor } from '@dismoi/domain/contributor';
import { generateStatefulContributor } from 'test/fakers/generateContributor';
import useContributorsFilters, {
  ContributorsFilters,
} from './useContributorsFilters';

interface Harness {
  render: (contributors: StatefulContributor[]) => void;
  result: () => ContributorsFilters;
  unmount: () => void;
}

/**
 * Rend le hook dans un composant sonde pour observer sa valeur de retour.
 * `@testing-library/react` n'est pas installé : on se contente de l'API
 * publique de React, sans JSX pour rester dans un fichier `.ts`.
 */
const renderHook = (): Harness => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (global as any).IS_REACT_ACT_ENVIRONMENT = true;

  const container = document.createElement('div');
  document.body.appendChild(container);
  const root: Root = createRoot(container);

  let lastResult: ContributorsFilters;
  const Probe = ({ contributors }: { contributors: StatefulContributor[] }) => {
    lastResult = useContributorsFilters(contributors);
    return null;
  };

  return {
    render: (contributors) => {
      act(() => {
        root.render(React.createElement(Probe, { contributors }));
      });
    },
    result: () => lastResult,
    unmount: () => {
      act(() => root.unmount());
      container.remove();
    },
  };
};

const changeSearch = (value: string) =>
  ({
    target: { value },
  }) as React.ChangeEvent<HTMLInputElement>;

describe('profiles > hooks > useContributorsFilters', function () {
  let harness: Harness;

  beforeEach(() => {
    harness = renderHook();
  });

  afterEach(() => {
    harness.unmount();
  });

  it('renvoie les contributeurs reçus', () => {
    harness.render([
      generateStatefulContributor({ id: 16 }),
      generateStatefulContributor({ id: 24 }),
    ]);

    expect(harness.result().filteredContributors).to.have.lengthOf(2);
  });

  it('prend en compte les contributeurs arrivés après le premier rendu', () => {
    harness.render([]);
    harness.render([generateStatefulContributor({ id: 16 })]);

    expect(harness.result().filteredContributors).to.have.lengthOf(1);
  });

  it('reflète les abonnements arrivés après la liste des contributeurs', () => {
    // Les contributeurs viennent de l'API, les abonnements de l'extension :
    // ils n'arrivent pas dans le même ordre. Tant que le hook recopiait la
    // liste dans son propre état, la seconde arrivée était ignorée et aucun
    // contributeur n'apparaissait comme suivi.
    harness.render([
      generateStatefulContributor({ id: 16, subscribed: false }),
    ]);
    harness.render([generateStatefulContributor({ id: 16, subscribed: true })]);

    expect(harness.result().filteredContributors[0].subscribed).to.equal(true);
  });

  it('ne garde que les contributeurs de la catégorie choisie', () => {
    harness.render([
      { ...generateStatefulContributor({ id: 16 }), categories: ['shopping'] },
      { ...generateStatefulContributor({ id: 24 }), categories: ['sante'] },
    ]);
    act(() => harness.result().setFilter('shopping'));

    expect(
      harness.result().filteredContributors.map(({ id }) => id),
    ).to.deep.equal([16]);
  });

  it('ne filtre rien quand « toutes les catégories » est choisi', () => {
    harness.render([
      { ...generateStatefulContributor({ id: 16 }), categories: ['shopping'] },
      { ...generateStatefulContributor({ id: 24 }), categories: ['sante'] },
    ]);
    act(() => harness.result().setFilter('shopping'));
    act(() => harness.result().setFilter('all'));

    expect(harness.result().filteredContributors).to.have.lengthOf(2);
  });

  it('applique la recherche à la liste à jour', () => {
    harness.render([
      generateStatefulContributor({ id: 16, name: 'Koos' }),
      generateStatefulContributor({ id: 24, name: 'Alertoo' }),
    ]);
    act(() =>
      harness.result().handleChangeSearchContributors(changeSearch('Alertoo')),
    );

    expect(
      harness.result().filteredContributors.map(({ id }) => id),
    ).to.deep.equal([24]);
  });

  it('combine la catégorie et la recherche', () => {
    harness.render([
      {
        ...generateStatefulContributor({ id: 16, name: 'Koos' }),
        categories: ['shopping'],
      },
      {
        ...generateStatefulContributor({ id: 24, name: 'Alertoo' }),
        categories: ['shopping'],
      },
      {
        ...generateStatefulContributor({ id: 25, name: 'Alertoo bis' }),
        categories: ['sante'],
      },
    ]);
    act(() => harness.result().setFilter('shopping'));
    act(() =>
      harness.result().handleChangeSearchContributors(changeSearch('Alertoo')),
    );

    expect(
      harness.result().filteredContributors.map(({ id }) => id),
    ).to.deep.equal([24]);
  });

  it('applique la recherche aux contributeurs arrivés ensuite', () => {
    harness.render([generateStatefulContributor({ id: 16, name: 'Koos' })]);
    act(() =>
      harness.result().handleChangeSearchContributors(changeSearch('Alertoo')),
    );
    harness.render([
      generateStatefulContributor({ id: 16, name: 'Koos' }),
      generateStatefulContributor({ id: 24, name: 'Alertoo' }),
    ]);

    expect(
      harness.result().filteredContributors.map(({ id }) => id),
    ).to.deep.equal([24]);
  });
});
