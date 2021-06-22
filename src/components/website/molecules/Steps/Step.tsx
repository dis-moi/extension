import React from 'react';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import SmallTitle from '../../atoms/Titles/SmallTitle';
import { StepItem } from './Steps';

export interface StepProps extends StepItem {
  className?: string;
}

const Index = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin-right: 10px;
`;

const Title = styled(props => <SmallTitle {...props} />)`
  text-align: left;
  margin-bottom: 0;
`;

const Detail = styled.div`
  font-size: 18px;
`;

const Step = styled(({ className, index, title, detail }: StepProps) => {
  return (
    <div className={className}>
      <div>
        <Index>{index}</Index>
      </div>
      <div>
        <Title>{title}</Title>
        <Detail>{detail}</Detail>
      </div>
    </div>
  );
})`
  display: flex;
  justify-content: flex-start;
  font-family: ${props => props.theme.website.fontFamily};
  color: ${props => props.theme.website.primaryColor};
  padding: 0 15px;
`;

export default Step;
