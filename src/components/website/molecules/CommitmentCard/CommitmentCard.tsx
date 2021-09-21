import React from 'react';
import styled from 'styled-components';
import Button, { ButtonIcon } from '../../atoms/Button/Button';
import Card from '../../atoms/Card/Card';
import SmallTitle from '../../atoms/Titles/SmallTitle';
import IconFast from './icons/IconFast';
import IconLock from './icons/IconLock';
import IconNoShit from './icons/IconNoShit';
import IconOpenSource from './icons/IconOpenSource';
import { useTranslation } from 'react-i18next';

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 65px;
  width: 65px;
  flex: 0 0 65px;
  border-radius: 50%;
  background: ${props => props.theme.website.secondaryColor};
  margin-right: 20px;
  @media (min-width: ${props => props.theme.desktopWidth}) {
    margin-bottom: 15px;
    margin-right: 0;
  }
  svg {
    height: 50%;
    width: 50%;
    path {
      fill: white;
    }
  }
`;
export const commitmentIcons = ['fast', 'lock', 'noShit', 'openSource'];
export type CommitmentIcon = 'fast' | 'lock' | 'noShit' | 'openSource';
const IconSvg = (icon: CommitmentIcon) => {
  if (icon === 'fast') return <IconFast />;
  if (icon === 'lock') return <IconLock />;
  if (icon === 'noShit') return <IconNoShit />;
  if (icon === 'openSource') return <IconOpenSource />;
};

export interface CommitmentCardProps {
  className?: string;
  icon: CommitmentIcon;
  title: string;
  text: string;
  buttonText: string;
  buttonIcon: ButtonIcon;
  href: string;
}

const CommitmentCard = styled(
  ({
    className,
    icon,
    title,
    text,
    buttonText,
    buttonIcon,
    href
  }: CommitmentCardProps) => {
    const { t } = useTranslation('website');
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    return (
      <Card
        className={className + (isOpen ? ' open' : '')}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="iconTitle">
          <Icon>{IconSvg(icon)}</Icon>
          <SmallTitle>{t(title)}</SmallTitle>
        </div>
        <div className="slideUpDown">
          <p dangerouslySetInnerHTML={{ __html: t(text) }} />
          <Button
            appearance="outline"
            text={t(buttonText)}
            icon={buttonIcon}
            color="grey"
            handleClick={() => (window.location.href = href)}
          />
        </div>
      </Card>
    );
  }
)`
  position: relative;
  font-family: ${props => props.theme.website.fontFamily};
  margin-bottom: 12px;
  cursor: pointer;
  justify-content: flex-start;
  align-items: flex-start;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M90 40H60V10c0-5.5-4.5-10-10-10S40 4.5 40 10v30H10C4.5 40 0 44.5 0 50s4.5 10 10 10h30v30c0 5.5 4.5 10 10 10s10-4.5 10-10V60h30c5.5 0 10-4.5 10-10s-4.5-10-10-10z" opacity="0.6" fill="rgb(109, 116, 126)"/></svg>');
  background-size: 14px 14px;
  background-position: calc(100% - 8px) 8px;
  background-repeat: no-repeat;
  @media (min-width: ${props => props.theme.desktopWidth}) {
    width: 100%;
    padding-bottom: 65px;
    margin-bottom: 0;
    cursor: auto;
    justify-content: flex-start;
    align-items: flex-start;
    background-image: none;
  }
  .iconTitle {
    display: flex;
    justify-content: flex-start;
    @media (min-width: ${props => props.theme.desktopWidth}) {
      flex-direction: column;
      align-items: center;
      width: 100%;
    }
    align-items: center;
    ${SmallTitle} {
      font-weight: bold;
      font-size: 18px;
      text-align: left;
      @media (min-width: ${props => props.theme.tabletWidth}) {
        font-size: 22px;
        text-align: center;
      }
      margin: -2px 0 0 0;
      @media (min-width: ${props => props.theme.desktopWidth}) {
        margin-top: 0;
      }
    }
  }
  .slideUpDown {
    display: none;
  }
  @media (min-width: ${props => props.theme.desktopWidth}) {
    .slideUpDown {
      display: block;
    }
  }
  p {
    margin: 0;
    padding: 8px 0;
    text-align: center;
    color: ${props => props.theme.website.greyColorDarker};
  }
  ${Button} {
    white-space: normal;
    height: auto;
    position: absolute;
    bottom: 15px;
    width: calc(100% - 30px);
    padding-top: 4px;
    padding-bottom: 6.5px;
    @media (min-width: ${props => props.theme.desktopWidth}) {
      padding-bottom: 7px;
    }
  }
  @media (max-width: ${props => props.theme.desktopWidth}) {
    &.open {
      padding-bottom: 45px;
      background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M85.4 71.2L64.1 50l21.2-21.2c3.9-3.9 3.9-10.2 0-14.1-3.9-3.9-10.2-3.9-14.1 0L50 35.9 28.8 14.6c-3.9-3.9-10.2-3.9-14.1 0s-3.9 10.2 0 14.1L35.9 50 14.6 71.2c-3.9 3.9-3.9 10.2 0 14.1 3.9 3.9 10.2 3.9 14.1 0L50 64.1l21.2 21.2c3.9 3.9 10.2 3.9 14.1 0 4-3.8 4-10.2.1-14.1z" opacity="0.6" fill="rgb(109, 116, 126)"/></svg>');

      .slideUpDown {
        display: block;

        ${Button} {
          width: calc(100% - 15px);
          bottom: 7.5px;
          left: 7.5px;
          border-top-left-radius: 0;
          border-top-right-radius: 0;
        }
      }
    }
  }
`;

export default CommitmentCard;
