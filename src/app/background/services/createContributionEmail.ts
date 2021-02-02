import { Contribution } from 'app/lmem/notice';
import {
  formatContributionHtmlEmail,
  formatContributionTextEmail
} from 'app/lmem/format/contribution';
import { truncateWords } from '../../utils/truncate';
import { TransactionEmail } from '../../../api/sendInBlue/types';
import { AppEnv } from 'types';

const { SEND_CONTRIBUTION_FROM, SEND_CONTRIBUTION_TO } = process.env as AppEnv;

const createContributionEmail = (
  contribution: Contribution
): TransactionEmail => ({
  sender: { email: SEND_CONTRIBUTION_FROM },
  to: [{ email: SEND_CONTRIBUTION_TO }],
  replyTo: contribution.contributor,
  subject: `${contribution.contributor.name}: ${truncateWords(
    8,
    contribution.message
  )} !`,
  htmlContent: formatContributionHtmlEmail(contribution),
  textContent: formatContributionTextEmail(contribution)
});

export default createContributionEmail;
