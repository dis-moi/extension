import styled from 'styled-components';
import PropTypes from 'prop-types';

const BulleTypeBackground = styled.div`
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

BulleTypeBackground.propTypes = {
  color: PropTypes.string,
};

BulleTypeBackground.defaultProps = {
  color: '#F1F1F4'
};

export default BulleTypeBackground;
