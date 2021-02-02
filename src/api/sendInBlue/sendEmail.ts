import { post } from './call';
import { TransactionEmail } from './types';

const sendEmail = (email: TransactionEmail) => post('smtp/email', email);

export default sendEmail;
