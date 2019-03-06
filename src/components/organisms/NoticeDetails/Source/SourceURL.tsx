import React from "react";
import Container from "./Container";

interface Props {
  children: string;
}
export const SourceURL = ({ children, ...props }: Props) => (
  <Container {...props} href={children}>
    {children}
  </Container>
);

export default SourceURL;
