import React from 'react';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import { StepItem } from './Steps';

export interface StepProps extends StepItem {
  className?: string;
}

const Index = styled.div`
  font-weight: bold;
  margin-right: 12px;
  font-size: 26px;
  @media (min-width: ${props => props.theme.tabletWidth}) {
    font-size: 30px;
  }
`;

const Title = styled.div`
  padding-top: 2px;
  font-weight: bold;
  font-size: 18px;
  @media (min-width: ${props => props.theme.tabletWidth}) {
    font-size: 22px;
  }
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
