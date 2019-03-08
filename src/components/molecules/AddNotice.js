import React from "react";
import PropTypes from "prop-types";
import { AddNoticeLink, CenterContainer } from "../atoms";

const AddNotice = ({ onClick, ...props }) => (
  <CenterContainer>
    <AddNoticeLink onClick={onClick} />
  </CenterContainer>
);

AddNotice.propTypes = {
  onClick: PropTypes.func
};

AddNotice.defaultProps = {
  onClick: () => {}
};

export default AddNotice;
