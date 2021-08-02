import React from 'react';
import formatLocaleDate from 'libs/utils/formatLocaleDate';

interface Props {
  children: Date;
}
const Time = ({ children, ...props }: Props) => (
  <time dateTime={children.toISOString()} {...props}>
    {formatLocaleDate(children)}
  </time>
);

Time.defaultProps = {
  children: null
};

export default Time;
