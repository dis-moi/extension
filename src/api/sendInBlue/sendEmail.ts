import { post } from './call';
import { TransactionEmail } from 'SendInBlue';

const sendEmail = (email: TransactionEmail) => post('smtp/email', email);

export default sendEmail;
