import React from 'react';
import SignUp from './SignUp';
import SentEmail from './SentEmail';

export default { title: 'Contribute/SignUp' };

export const Normal = () => <SignUp />;
export const Error = () => <SignUp />;
export const Valid = () => <SignUp />;
export const SentEmailMessage = () => <SentEmail />;
