import styled from 'styled-components';

interface Props {
  hasNotices?: boolean;
}

export const Section = styled.section.attrs({
  'data-test-id': 'notification-container'
})<Props>`
  display: flex;
  flex-direction: column;
  max-width: 384px;
  height: 414px;
  font-size: 10px;
  font-family: 'Lato', sans-serif;
  color: ${props => props.theme.primaryColor};
  background-color: ${props =>
    props.hasNotices ? props.theme.noticeBg : props.theme.accountListBg};
  border-radius: 7px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.58);
  overflow: hidden;
`;

export default Section;
