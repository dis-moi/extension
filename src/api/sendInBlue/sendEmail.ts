import { post } from './call';

const sendEmail = (email: SendInBlue.TransactionEmail) =>
  post('smtp/email', email);

export default sendEmail;
