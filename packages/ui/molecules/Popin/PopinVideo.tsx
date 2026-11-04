import styled from 'styled-components';

const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;
export default VideoWrapper;
