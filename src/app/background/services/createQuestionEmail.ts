import { Question } from 'app/lmem/notice';
import {
  formatQuestionHtmlEmail,
  formatQuestionTextEmail
} from 'app/lmem/format/question';
import { truncateWords } from '../../utils/truncate';
import { TransactionEmail } from '../../../api/sendInBlue/types';
import { AppEnv } from 'types';

const { SEND_CONTRIBUTION_FROM, SEND_CONTRIBUTION_TO } = process.env as AppEnv;

const createQuestionEmail = (question: Question): TransactionEmail => ({
  sender: { email: SEND_CONTRIBUTION_FROM },
  to: [{ email: SEND_CONTRIBUTION_TO }],
  replyTo: question.contributor,
  subject: `Nouvelle question de ${question.contributor.name}: ${truncateWords(
    8,
    question.message
  )}`,
  htmlContent: formatQuestionHtmlEmail(question),
  textContent: formatQuestionTextEmail(question)
});

export default createQuestionEmail;
