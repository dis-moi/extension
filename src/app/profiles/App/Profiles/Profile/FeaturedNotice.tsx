import styled from 'styled-components';
import { ProfileNoticeListItem } from './ProfileNoticeListItem';

const FeaturedNotice = styled(ProfileNoticeListItem).attrs({ featured: true })`
  margin-bottom: 40px;

  img {
    margin-bottom: 10px;
  }

  @media (max-width: ${props => props.theme.tabletWidth}) {
    display: flex;
    flex-direction: column;

    img {
      align-self: flex-end;
      width: auto !important;
      max-height: 105vw;
    }
  }
`;

export default FeaturedNotice;
