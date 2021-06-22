import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import Screenshot1 from 'assets/img/website/screenshots/dismoi-screenshot-le-même-en-local-mounted-website-desktop.jpg';
import Screenshot2 from 'assets/img/website/screenshots/dismoi-screenshot-selon-que-choisir-mounted-website-desktop.jpg';
import Screenshot3 from 'assets/img/website/screenshots/dismoi-screenshot-biet-thomas-mounted-website-desktop.jpg';
import SectionTitle from '../../atoms/Titles/SectionTitle';
import TabButton from '../../atoms/TabButton/TabButton';
import { ButtonProps } from '../../atoms/Button/Button';
import SmallTitle from '../../atoms/Titles/SmallTitle';
import SectionArrow from '../../atoms/SectionArrow/SectionArrow';

const StyledSmallTitle = styled(props => <SmallTitle {...props} />)`
  color: ${props => props.theme.website.secondaryColor};
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
  transform: translateY(-50%) rotate(90deg) scale(0.8);
  left: -12.5px;
  @media (min-width: ${props => props.theme.tabletWidth}) {
    transform: translateY(-50%) rotate(90deg);
  }
`;

const ArrowNext = styled(props => <StyledSectionArrow {...props} />)`
  transform: translateY(-50%) rotate(-90deg) scale(0.8);
  right: -12.5px;
  @media (min-width: ${props => props.theme.tabletWidth}) {
    transform: translateY(-50%) rotate(-90deg);
  }
`;

export interface Example {
  src: string;
  alt: string;
  title: string;
  buttonText: string;
}

export const examples: Example[] = [
  {
    src: Screenshot1,
    alt: 'Exemple – Le Même en Local',
    title:
      'Un guide spécialisé vous suggère une alternative locale ici du texte',
    buttonText: 'Alternatives conso'
  },
  {
    src: Screenshot2,
    alt: 'Exemple – Selon Que Choisir',
    title:
      'Une association de consommateurs vous signale une arnaque ici du texte',
    buttonText: 'Alertes Arnaques'
  },
  {
    src: Screenshot3,
    alt: 'Exemple – Biet Thomas',
    title:
      'Un lecteur vous partage une discussion qui approfondit l’article consulté',
    buttonText: 'Infos éclairantes'
  }
];

export interface ExamplesSliderProps {
  className?: string;
  examples: [Example, ...Example[]];
}

const ExamplesSlider = styled(
  ({ className, examples }: ExamplesSliderProps) => {
    const [title, setTitle] = React.useState<string>(examples[0].title);
    const [titleVisible, setTitleVisible] = React.useState<boolean>(true);
    const [tabButtonIndex, setTabButtonIndex] = React.useState<number>(0);
    const [settings, setSettings] = React.useState({
      dots: false,
      arrows: false,
      infinite: true,
      // fade: true,
      // lazyLoad: true, // bug ts ?
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      speed: 500,
      autoplaySpeed: 3500,
      // pauseOnHover: true,
      beforeChange: (current: number, next: number) => {
        setTitleVisible(false);
        setTabButtonIndex(next);
        setTimeout(() => {
          setTitle(examples[next].title);
          setTitleVisible(true);
        }, 500);
      }
    });

    let sliderInstance: Slider | null;

    return (
      <div className={className}>
        <StyledSmallTitle>Par exemple</StyledSmallTitle>
        <SectionTitle className={titleVisible ? 'fadeIn' : 'fadeOut'}>
          {title}
        </SectionTitle>
        <SliderWrapper>
          <Slider ref={slider => (sliderInstance = slider)} {...settings}>
            {examples &&
              examples.map<React.ReactNode>((exemple, index) => (
                <div key={index}>
                  <img src={exemple.src.substr(1)} alt={exemple.alt} />
                </div>
              ))}
          </Slider>
          <ArrowPrev
            handleClick={() => {
              setSettings({ ...settings, autoplay: false });
              sliderInstance && sliderInstance.slickPrev();
            }}
          />
          <ArrowNext
            handleClick={() => {
              setSettings({ ...settings, autoplay: false });
              sliderInstance && sliderInstance.slickNext();
            }}
          />
        </SliderWrapper>
        <StyledTabButton
          buttons={examples.reduce(
            (acc: ButtonProps[], example: Example, index: number) => [
              ...acc,
              {
                text: example.buttonText,
                handleClick: () => {
                  setSettings({ ...settings, autoplay: false });
                  sliderInstance && sliderInstance.slickGoTo(index);
                }
              }
            ],
            []
          )}
          color="green"
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
  div[tabindex] {
    text-align: center;
    img {
      margin-top: 10px;
      border: 1px solid ${props => props.theme.website.greyColorDarker};
      box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
      display: initial;
      width: calc(100vw - 100px);
      @media (min-width: ${props => props.theme.tabletWidth}) {
        width: auto;
        height: calc(100vh - 120px);
        max-height: 450px;
      }
      @media (min-width: ${props => props.theme.desktopWidth}) {
        max-height: 500px;
      }
    }
  }

  .fadeOut {
    opacity: 0;
    transition: opacity 0.5s;
  }
  .fadeIn {
    opacity: 1;
    transition: opacity 0.5s;
  }

  /* --- Slick Theme --- */
  /* Arrows */
  .slick-prev,
  .slick-next {
    font-size: 0;
    line-height: 0;
    position: absolute;
    top: 50%;
    display: block;
    width: 20px;
    height: 20px;
    padding: 0;
    transform: translate(0, -50%);
    cursor: pointer;
    color: transparent;
    border: none;
    outline: none;
    background: transparent;
  }
  .slick-prev:hover,
  .slick-prev:focus,
  .slick-next:hover,
  .slick-next:focus {
    color: transparent;
    outline: none;
    background: transparent;
  }
  .slick-prev:hover:before,
  .slick-prev:focus:before,
  .slick-next:hover:before,
  .slick-next:focus:before {
    opacity: 1;
  }
  .slick-prev.slick-disabled:before,
  .slick-next.slick-disabled:before {
    opacity: 0.25;
  }

  .slick-prev:before,
  .slick-next:before {
    font-size: 20px;
    line-height: 1;
    opacity: 0.75;
    color: black;
  }

  .slick-prev {
    left: -25px;
  }
  .slick-prev:before {
    content: '←';
  }

  .slick-next {
    right: -25px;
  }
  .slick-next:before {
    content: '→';
  }
`;

export default ExamplesSlider;
