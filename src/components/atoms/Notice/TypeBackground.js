import styled from 'styled-components';
import PropTypes from 'prop-types';

const TypeBackground = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 38px;
    height: 38px;
    margin-right: 10px;
    border-radius: 50%;
    background-color: ${props => props.color};

    & > svg {
      fill: #fff;
    }
`;

TypeBackground.propTypes = {
  color: PropTypes.string,
};

TypeBackground.defaultProps = {
  color: '#F1F1F4'
};

export default TypeBackground;
