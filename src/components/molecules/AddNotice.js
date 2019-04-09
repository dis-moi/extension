import React from 'react';
import { AddNoticeLink, CenterContainer, } from '../atoms';

const AddNotice = ({ ...props }) => (
  <CenterContainer>
    <AddNoticeLink {...props} />
  </CenterContainer>
);

export default AddNotice;
