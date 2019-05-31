import React, { Fragment } from 'react';
import truncate from '../../app/utils/truncate';

interface Props {
  children: string;
  numberOfCharacters: number;
  preserveWords: boolean;
}
const Truncated = ({ numberOfCharacters, preserveWords, children }: Props) => (
  <Fragment>
    {numberOfCharacters
      ? truncate(children, numberOfCharacters, preserveWords)
      : children}
  </Fragment>
);

Truncated.defaultProps = {
  children: '',
  preserveWords: true
};

export default Truncated;
