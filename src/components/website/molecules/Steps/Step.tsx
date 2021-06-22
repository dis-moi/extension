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

const Title = styled.div`
  padding-top: 5px;
  font-size: 22px;
  font-weight: bold;
`;

const Detail = styled.span`
  font-weight: normal;
`;

const Step = styled(({ className, index, title, detail }: StepProps) => {
  return (
    <div className={className}>
      <div>
        <Index>{index}</Index>
      </div>
      <div>
        <Title>
          {title} <Detail>{detail}</Detail>
        </Title>
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
