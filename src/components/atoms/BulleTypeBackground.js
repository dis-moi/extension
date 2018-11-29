import styled from 'styled-components';
import PropTypes from 'prop-types';

const BulleTypeBackground = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;

    background-color: ${props => props.color}
`;

BulleTypeBackground.propTypes = {
  color: PropTypes.string,
};

BulleTypeBackground.defaultProps = {
  color: '#F1F1F4'
};

export default BulleTypeBackground;
