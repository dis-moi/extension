import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import ScreenshotDesktop1 from '../../../../assets/img/website/screenshots/dismoi-screenshot-le-même-en-local-mounted-website-desktop.jpg';
import ScreenshotMobile1 from '../../../../assets/img/website/screenshots/dismoi-screenshot-le-même-en-local-mounted-website-mobile.jpg';
import ScreenshotDesktop2 from '../../../../assets/img/website/screenshots/dismoi-screenshot-selon-que-choisir-mounted-website-desktop.jpg';
import ScreenshotMobile2 from '../../../../assets/img/website/screenshots/dismoi-screenshot-selon-que-choisir-mounted-website-mobile.jpg';
import ScreenshotDesktop3 from '../../../../assets/img/website/screenshots/dismoi-screenshot-biet-thomas-mounted-website-desktop.jpg';
import ScreenshotMobile3 from '../../../../assets/img/website/screenshots/dismoi-screenshot-biet-thomas-mounted-website-mobile.jpg';
import SectionTitle from '../../atoms/Titles/SectionTitle';
import TabButton from '../../atoms/TabButton/TabButton';
import { ButtonProps } from '../../atoms/Button/Button';
import SmallTitle from '../../atoms/Titles/SmallTitle';
import SectionArrow from '../../atoms/SectionArrow/SectionArrow';
import { useTranslation } from 'react-i18next';

const StyledSmallTitle = styled(props => <SmallTitle {...props} />)`
  color: ${props => props.theme.website.secondaryColorDarker};
`;

const StyledTabButton = styled(props => <TabButton {...props} />)`
  margin: 35px auto 0 auto;
`;

const SliderWrapper = styled.div`
  position: relative;
`;

const StyledSectionArrow = styled(props => <SectionArrow {...props} />)`
  position: absolute;
  top: 50%;
  path {
    fill: ${props => props.theme.website.secondaryColor};
  }
`;

const ArrowPrev = styled(props => <StyledSectionArrow {...props} />)`
  display: none;
  @media (min-width: ${props => props.theme.tabletWidth}) {
    display: block;
    left: -32.5px;
    transform: translateY(-50%) rotate(90deg);
  }
  @media (min-width: ${props => props.theme.desktopWidth}) {
    left: -12.5px;
  }
`;

const ArrowNext = styled(props => <StyledSectionArrow {...props} />)`
  display: none;
  @media (min-width: ${props => props.theme.tabletWidth}) {
    display: block;
    right: -32.5px;
    transform: translateY(-50%) rotate(-90deg);
  }
  @media (min-width: ${props => props.theme.desktopWidth}) {
    right: -12.5px;
  }
`;

export interface Example {
  srcMobile: string;
  srcDesktop: string;
  alt: string;
  title: string;
  buttonText: string;
}

export const examples: Example[] = [
  {
    srcMobile: ScreenshotMobile1.substr(1),
    srcDesktop: ScreenshotDesktop1.substr(1),
    alt: 'home.examples.example1.alt',
    title: 'home.examples.example1.title',
    buttonText: 'home.examples.example1.buttonText'
  },
  {
    srcMobile: ScreenshotMobile2.substr(1),
    srcDesktop: ScreenshotDesktop2.substr(1),
    alt: 'home.examples.example2.alt',
    title: 'home.examples.example2.title',
    buttonText: 'home.examples.example2.buttonText'
  },
  {
    srcMobile: ScreenshotMobile3.substr(1),
    srcDesktop: ScreenshotDesktop3.substr(1),
    alt: 'home.examples.example3.alt',
    title: 'home.examples.example3.title',
    buttonText: 'home.examples.example3.buttonText'
  }
];

export interface ExamplesSliderProps {
  className?: string;
  examples: [Example, ...Example[]];
}

const ExamplesSlider = styled(
  ({ className, examples }: ExamplesSliderProps) => {
    const { t } = useTranslation('website');
    const [tabButtonIndex, setTabButtonIndex] = React.useState<number>(0);
    const [settings, setSettings] = React.useState({
      dots: false,
      arrows: false,
      infinite: true,
      // fade: true,
      // lazyLoad: true, // bug ts ?
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false,
      speed: 500,
      autoplaySpeed: 3500,
      // pauseOnHover: true,
      beforeChange: (current: number, next: number) => {
        setTabButtonIndex(next);
      }
    });

    const sliderRef = useRef<Slider | null>(null);

    const setSliderPlaying = () => {
      if (sliderRef?.current) {
        const offset = window.pageYOffset;
        const coverHeight =
          document.querySelector('#cover')?.getBoundingClientRect().height || 0;
        const isVisibleEnough = offset > coverHeight / 2;
        if (isVisibleEnough) {
          sliderRef.current.slickPlay();
        } else {
          sliderRef.current.slickPause();
        }
      }
    };
    useEffect(() => {
      window.addEventListener('scroll', setSliderPlaying);
      return () => window.removeEventListener('scroll', setSliderPlaying);
    }, []);

    return (
      <div className={className}>
        <StyledSmallTitle>{t('home.examples.forExample')}</StyledSmallTitle>
        <SliderWrapper>
          <Slider ref={slider => (sliderRef.current = slider)} {...settings}>
            {examples &&
              examples.map<React.ReactNode>((example, index) => (
                <div key={index}>
                  <SectionTitle>{t(example.title)}</SectionTitle>
                  <img
                    srcSet={
                      example.srcMobile +
                      ' 1000w, ' +
                      example.srcDesktop +
                      ' 2800w'
                    }
                    sizes="(max-width: 768px) 1000px, 2800px"
                    src={example.srcDesktop}
                    alt={t(example.alt)}
                  />
                </div>
              ))}
          </Slider>
          <ArrowPrev
            handleClick={() => {
              setSettings({ ...settings, autoplay: false });
              sliderRef?.current && sliderRef.current.slickPrev();
            }}
          />
          <ArrowNext
            handleClick={() => {
              setSettings({ ...settings, autoplay: false });
              sliderRef?.current && sliderRef.current.slickNext();
            }}
          />
        </SliderWrapper>
        <StyledTabButton
          buttons={examples.reduce(
            (acc: ButtonProps[], example: Example, index: number) => [
              ...acc,
              {
                text: t(example.buttonText),
                handleClick: () => {
                  setSettings({ ...settings, autoplay: false });
                  sliderRef?.current && sliderRef.current.slickGoTo(index);
                }
              }
            ],
            []
          )}
          color="greenDarker"
          activeIndex={tabButtonIndex}
          setActiveIndex={setTabButtonIndex}
        />
      </div>
    );
  }
)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;

  .slick-track {
    display: flex !important;
    .slick-slide {
      height: inherit !important;
      div {
        height: 100%;
      }
      div[tabindex] {
        text-align: center;
        display: flex !important;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        ${SectionTitle} {
          color: ${props => props.theme.website.secondaryColorDarker};
          font-weight: normal;
          margin: auto 0;
        }
        img {
          margin-top: 15px;
          border: 1px solid ${props => props.theme.website.greyColorDarker};
          box-shadow: ${props => props.theme.website.boxShadow};
          display: initial;
          width: calc(100vw - 32px);
          max-width: 600px;
          @media (min-width: ${props => props.theme.tabletWidth}) {
            margin-top: 20px;
            width: auto;
            max-width: none;
            height: calc(100vh - 120px);
            max-height: 450px;
          }
          @media (min-width: ${props => props.theme.desktopWidth}) {
            margin-top: 25px;
            max-height: 500px;
          }
        }
      }
    }
  }
`;

export default ExamplesSlider;
