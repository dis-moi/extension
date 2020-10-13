import { Question } from '../notice';
import { format } from 'date-fns';
import frLocale from 'date-fns/locale/fr';

const formatDate = (date: Date): string =>
  format(date, 'DD/MM/YYYY HH:mm:ss', { locale: frLocale });

export const formatQuestionHtmlEmail = (question: Question) => `
<html lang="fr"><body>
  <h1>Nouvelle question de ${question.contributor.name} !</h1>
  <ul>
    <li><strong>date: </strong>${formatDate(question.created)}</li>
    <li><strong>e-mail: </strong>${question.contributor.email}</li>
    <li><strong>url: </strong>${question.url}</li>
    ${question.toContributorId &&
      `<li><strong>pour: </strong>${question.toContributorId}</li>`}
  </ul>
  <p>${question.message}</p>
</body></html>`;

export const formatQuestionTextEmail = (question: Question) =>
  `Nouvelle question de ${question.contributor.name} !\n
\n
date: ${formatDate(question.created)}\n
e-mail: ${question.contributor.email}\n
url: ${question.url}\n
question: ${question.message}\n
pour: ${question.toContributorId}\n
`;
