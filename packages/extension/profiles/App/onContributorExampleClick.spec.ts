import { expect } from 'chai';
import { TFunction } from 'i18next';
import { ContextPopinState } from '../store/reducers/contextPopin.reducer';
import onContributorExampleClick from './onContributorExampleClick';

/**
 * Les textes de la popin venaient du singleton global d'i18next, que le site
 * n'initialise plus : ils sortaient `undefined` et la popin s'ouvrait vide
 * pour tout visiteur sans extension. La traduction est maintenant celle du
 * composant, qui la tient du fournisseur React.
 */
describe('onContributorExampleClick', () => {
  const contributor = {
    id: 16,
    name: 'Le Même en Mieux',
    contribution: { example: { exampleMatchingUrl: 'https://exemple.test' } },
  } as never;

  // Rend la clé demandée, afin que les exemples constatent d'où vient le
  // texte sans dépendre du contenu des traductions.
  const t = ((cle: string, variables?: Record<string, unknown>) =>
    variables ? `${cle} (${variables.contributorName})` : cle) as TFunction;

  const popinOuverte = (connected?: boolean, subscriptions?: number[]) => {
    let popin: ContextPopinState | null = null;

    onContributorExampleClick(
      contributor,
      connected,
      subscriptions,
      () => () => null,
      (payload: ContextPopinState) => {
        popin = payload;
      },
      t,
    );

    return popin as ContextPopinState | null;
  };

  it('invite à installer l’extension avec un texte, pas avec du vide', () => {
    const popin = popinOuverte(false);

    expect(popin?.content?.text).to.equal(
      'profiles:popin.is_not_connected.message (Le Même en Mieux)',
    );
    expect(popin?.content?.btn?.label).to.equal(
      'profiles:popin.is_not_connected.btn_text',
    );
  });

  it('invite à s’abonner avec un texte, pas avec du vide', () => {
    const popin = popinOuverte(true, []);

    expect(popin?.content?.text).to.equal(
      'profiles:popin.is_not_subscriber.message (Le Même en Mieux)',
    );
    expect(popin?.content?.btn?.label).to.equal(
      'profiles:popin.is_not_subscriber.btn_text',
    );
  });
});
