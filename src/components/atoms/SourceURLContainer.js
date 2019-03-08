import styled from 'styled-components';
import ExternalLink from './ExternalLink';

export default styled(ExternalLink)`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 66%;
    display: inline-block;
    vertical-align: bottom;
`;
