import styled from 'styled-components';
import { ProfileNoticeListItem } from './ProfileNoticeListItem';

const FeaturedNotice = styled(ProfileNoticeListItem).attrs({ featured: true })`
  margin-bottom: 40px;
`;

export default FeaturedNotice;
