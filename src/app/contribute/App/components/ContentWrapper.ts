import styled from 'styled-components';
import { Button, Title2 } from 'components/atoms';
import { FormGroup } from 'components/atoms/Forms';

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 36px 58px;
  text-align: center;

  ${Title2} {
    margin-bottom: 24px;
  }

  ${FormGroup}:last-of-type {
    margin-bottom: 28px;
  }

  ${Button} {
    margin-top: 28px;
  }
`;

export default ContentWrapper;
