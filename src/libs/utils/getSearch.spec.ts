import { expect } from 'chai';
import { StatefulContributor } from '../domain/contributor';
import getSearch from './getSearch';

const contributors = [
  {
    name: 'CaptainFact.io',
    intro:
      "<p>Plateforme de fact-checking collaboratif. Pour améliorer l'esprit critique, la qualité des informations et les décisions. Contre les fake news, les arnaques et la désinformation.</p>"
  },
  {
    name: 'Amazon Antidote',
    intro:
      "<p>Lorsque vous consultez un produit sur Amazon, vous êtes alerté des alternatives moins chères, plus éthiques, plus locales sur d'autres sites web.</p>"
  },
  {
    name: 'Colibri écolo',
    intro:
      "<p>Compagnon web vous alertant dès qu'il y a opportunité de faire un geste pour la planète, notamment via des alternatives écologiques</p>"
  },
  {
    name: 'Nothing but my Opinion',
    intro:
      '<p>Anne, 26 ans, ambassadrice Slow Cosmétique et jury du label Cosmébio, experte passionnée de Green Beauty et de composition cosmétique. Plus globalement, elle cherche des alternatives plus saines à chaque aspect de sa vie.</p>'
  },
  {
    name: 'Le girondin local',
    intro:
      '<p>Astuces, bons plans et solutions locales à Bordeaux et en Gironde</p>'
  },
  {
    name: 'Alternatives gratuites',
    intro:
      '<p>Je signale les alternatives gratuites à ce que vous consultez. Par exemple, un logiciel open source, un contenu accessible sans abonnement ailleurs, une version gratuite, etc.</p>'
  },
  {
    name: 'I-boycott.org',
    intro:
      '<p>Plateforme participative dont l’objectif est de favoriser une consommation citoyenne et responsable, à travers le boycott et le buycott. Site web : <a   href="http://www.i-boycott.org?utm_medium=Dismoi_extension_navigateur" target="_blank" rel="noopener noreferrer">www.i-boycott.org</a></p>'
  },
  {
    name: 'Parents Eco-Locaux',
    intro:
      "<p>Pour tous les jeunes parents qui souhaitent consommer des produits pour bébé plus sains et respectueux de l'environnement.</p>"
  },
  {
    name: "On N'est Plus Des Pigeons !",
    intro:
      '<p>Alertes anti-arnaque et astuces conso issues du magazine de consommation &quot;On n\'est plus des pigeons&quot;  diffusé sur <a   href="http://france.tv?utm_medium=Dismoi_extension_navigateur" target="_blank" rel="noopener noreferrer">France.tv</a> Slash.</p>'
  },
  {
    name: 'Edouard Colas',
    intro:
      '<p>Spécialiste du droit de l\'immobilier, je propose des analyses complémentaires sur des articles et actus juridiques, notamment sur <a   href="http://legifrance.fr?utm_medium=Dismoi_extension_navigateur" target="_blank" rel="noopener noreferrer">Legifrance.fr</a></p>'
  }
] as StatefulContributor[];

describe('Get Search result', function() {
  it('should get one result', function() {
    const res = getSearch('CaptainFact.io', contributors);
    expect(res.length).to.be.equal(1);
  });
  it('should get one result for wrong text formating', function() {
    const res = getSearch("On N'est PLUS des Pigeons", contributors);
    expect(res.length).to.be.equal(1);
  });
  it('should get two result', function() {
    const res = getSearch('PlAtEforme', contributors);
    expect(res.length).to.be.equal(2);
  });
  it('should get one result with two word', function() {
    const res = getSearch('CaptainFact.io PlAtEforme', contributors);
    expect(res[0].name).to.be.equal('CaptainFact.io');
  });
});
