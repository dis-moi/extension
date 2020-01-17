import { Contribution } from '../notice';
import { format } from 'date-fns';
import frLocale from 'date-fns/locale/fr';

const formatDate = (date: Date): string =>
  format(date, 'DD/MM/YYYY HH:mm:ss', { locale: frLocale });

export const formatContributionHtmlEmail = (contribution: Contribution) => `
<html lang="fr"><body>
  <h1>Nouvelle contribution de ${contribution.contributor.name} !</h1>
  <ul>
    <li><strong>date: </strong>${formatDate(contribution.created)}</li>
    <li><strong>e-mail: </strong>${contribution.contributor.email}</li>
    <li><strong>url: </strong>${contribution.url}</li>
  </ul>
  <p>${contribution.message}</p>
</body></html>
    `;

export const formatContributionTextEmail = (contribution: Contribution) =>
  `Nouvelle contribution de ${contribution.contributor.name} !\n
\n
date: ${formatDate(contribution.created)}\n
e-mail: ${contribution.contributor.email}\n
url: ${contribution.url}\n
message: ${contribution.message}\n
`;
