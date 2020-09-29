import styled from 'styled-components';
import { ProfileNoticeListItem } from './ProfileNoticeListItem';

const FeaturedNotice = styled(ProfileNoticeListItem).attrs({ featured: true })`
  margin-bottom: 40px;

  img {
    margin-bottom: 10px;
    box-shadow: 4px 4px 18px 0 rgba(0, 0, 0, 0.3);
  }

  @media (max-width: ${props => props.theme.tabletWidth}) {
    display: flex;
    flex-direction: column;

    img {
      align-self: flex-end;
      width: auto !important;
      max-height: 105vw;
      max-width: initial;
    }
  }
`;

export default FeaturedNotice;
