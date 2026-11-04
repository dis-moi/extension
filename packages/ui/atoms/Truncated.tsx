import React, { Fragment } from 'react';
import truncate from 'libs/utils/truncate';

interface Props {
  children?: string;
  numberOfCharacters: number;
  preserveWords?: boolean;
}
const Truncated = ({
  numberOfCharacters,
  preserveWords = true,
  children = '',
}: Props) => (
  <Fragment>
    {numberOfCharacters
      ? truncate(children, numberOfCharacters, preserveWords)
      : children}
  </Fragment>
);

export default Truncated;
