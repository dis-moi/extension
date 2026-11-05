import { expect } from 'chai';
import { subscribe, subscribed, unsubscribe } from 'libs/store/actions';
import { ContributorId, StatefulContributor } from '@dismoi/domain/contributor';
import { generateStatefulContributor } from 'test/fakers/generateContributor';
import { items } from './contributors.reducer';

const id = (value: number) => value as ContributorId;

const stateOf = (...ids: number[]): StatefulContributor[] =>
  ids.map((value) => generateStatefulContributor({ id: value }));

describe('profiles > reducers > contributors > items', function () {
  it('marque le premier contributeur de la liste comme en cours', () => {
    // `findIndex` renvoie 0 pour le premier élément : une garde écrite
    // `if (index)` l'exclut en silence, et lui seul.
    const state = stateOf(16, 24);

    const [first] = items(state, subscribe(id(16)));

    expect(first.subscribing).to.equal(true);
    expect(first.ratings.subscribes).to.equal(state[0].ratings.subscribes + 1);
  });

  it('marque un contributeur du milieu comme en cours', () => {
    const state = stateOf(16, 24, 25);

    const result = items(state, unsubscribe(id(24)));

    expect(result[1].subscribing).to.equal(true);
    expect(result[1].ratings.subscribes).to.equal(
      state[1].ratings.subscribes - 1,
    );
  });

  it('laisse la liste intacte quand le contributeur est inconnu', () => {
    // `findIndex` renvoie -1 : `state.slice(0, -1)` suivi de
    // `state.slice(0)` recopie presque toute la liste et y insère un objet
    // né d'un `state[-1]` indéfini.
    const state = stateOf(16, 24, 25);

    expect(items(state, subscribed(id(999)))).to.deep.equal(state);
  });

  it('laisse la liste intacte quand elle est vide', () => {
    expect(items([], subscribe(id(16)))).to.deep.equal([]);
  });
});
