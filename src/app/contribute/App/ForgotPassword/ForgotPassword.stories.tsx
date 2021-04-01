import React from 'react';
import ForgotPassword from './ForgotPassword';
import SentLink from './SentLink';
import ResetPassword from './ResetPassword';

export default { title: 'Contribute/Forgot Password' };

export const Forgot = () => <ForgotPassword />;
export const SentEmail = () => <SentLink />;
export const Reset = () => <ResetPassword />;
