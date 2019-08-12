import styled from 'styled-components';
import Container from 'components/molecules/TabsNav/Container';
import BackgroundButton from 'components/atoms/Button/BackgroundButton/BackgroundButton';

export default styled(Container)`
  margin-bottom: 22px;

  ${BackgroundButton} {
    margin-left: auto;
    align-self: center;
  }
`;
