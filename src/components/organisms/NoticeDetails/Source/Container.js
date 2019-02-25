import styled from 'styled-components';
import ExternalLink from '../../../atoms/ExternalLink';

export default styled(ExternalLink)`

    & > span {
        text-decoration: underline;
        vertical-align: bottom;
    }
`;
