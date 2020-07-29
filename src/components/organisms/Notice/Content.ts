import { ReactNode } from 'react';
import styled from 'styled-components';
import { LocationDescriptor } from 'history';
import Avatar from 'components/molecules/Avatar/Avatar';
import { ContributorName, OpenButton } from 'components/atoms';
import Title from './Title';

interface ContentProps {
  to?: LocationDescriptor;
  children: ReactNode;
  isRead: boolean;
}

export default styled.div<ContentProps>`
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 338px;
  min-height: 85px;
  padding: 12px 12px 12px 13px;
  margin-right: 11px;
  margin-left: 5px;
  text-decoration: none;
  background-color: #fff;
  border-radius: 15px;
  border: #fff;

  &,
  p {
    transition: all 0.2s ease-in-out;
  }

  ${Avatar} {
    align-self: flex-start;
    margin-right: 10px;
  }

  &[href]:hover {
    border-color: ${props => props.theme.activeColor};

    p {
      color: ${props => props.theme.activeColor};
    }
  }

  & > p + div {
    width: 100%;
  }

  & [class^='${OpenButton}'] {
    height: auto;
  }

  &:hover > div:nth-child(3) {
    stroke: ${props => props.theme.activeColor};
  }

  ${Title} {
    font-weight: ${props => (props.isRead ? '500' : 'bold')};
  }

  ${ContributorName}, ${Title} {
    opacity: ${props => (props.isRead ? '.5' : '1')};
  }
`;
