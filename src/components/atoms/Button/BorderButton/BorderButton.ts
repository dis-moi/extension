import styled from 'styled-components';
import BackgroundButton, { BackgroundButtonProps } from '../BackgroundButton';

export default styled(BackgroundButton).attrs(() => ({ bordered: true }))<
  BackgroundButtonProps
>``;
