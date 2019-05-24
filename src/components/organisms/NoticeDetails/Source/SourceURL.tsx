import React from 'react';
import Container from './Container';

interface Props {
  children: string;
  onClick?: (...args: any[]) => any;
}
export const SourceURL = ({ children, ...props }: Props) => (
  <Container {...props} href={children}>
    {children}
  </Container>
);

export default SourceURL;
