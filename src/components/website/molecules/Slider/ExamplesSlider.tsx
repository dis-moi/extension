import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import Screenshot1 from 'assets/img/website/screenshots/dismoi-screenshot-le-même-en-local-mounted-website-desktop.jpg';
import Screenshot2 from 'assets/img/website/screenshots/dismoi-screenshot-selon-que-choisir-mounted-website-desktop.jpg';
import Screenshot3 from 'assets/img/website/screenshots/dismoi-screenshot-biet-thomas-mounted-website-desktop.jpg';
import Screenshot4 from 'assets/img/website/screenshots/dismoi-screenshot-amazon-antidote-mounted-website-desktop.jpg';
import SectionTitle from '../../atoms/Titles/SectionTitle';

export interface Exemple {
  src: string;
  alt: string;
  title: string;
}

export const examples: Exemple[] = [
  {
    src: Screenshot1,
    alt: 'Exemple – Le Même en Local',
    title:
      'un guide spécialisé vous suggère une alternative locale ici du texte'
  },
  {
    src: Screenshot2,
    alt: 'Exemple – Selon Que Choisir',
    title:
      'une association de consommateurs vous signale une arnaque ici du texte'
  },
  {
    src: Screenshot3,
    alt: 'Exemple – Biet Thomas',
    title:
      'un lecteur vous partage une discussion qui approfondit l’article consulté'
  },
  {
    src: Screenshot4,
    alt: 'Exemple – Amazon Antidote',
    title:
      '« Amazon Antidote » vous signale une alternative moins chère au produit consulté '
  }
];

export interface ExamplesSliderProps {
  className?: string;
  examples: [Exemple, ...Exemple[]];
}

const ExamplesSlider = styled(
  ({ className, examples }: ExamplesSliderProps) => {
    const [title, setTitle] = React.useState<string>(examples[0].title);
    const [titleVisible, setTitleVisible] = React.useState<boolean>(true);

    const settings = {
      dots: false,
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
        setTimeout(() => {
          setTitle(examples[next].title);
          setTitleVisible(true);
        }, 500);
      }
    };
    return (
      <div className={className}>
        <SectionTitle className={titleVisible ? 'fadeIn' : 'fadeOut'}>
          Par exemple, {title}
        </SectionTitle>
        <Slider {...settings}>
          {examples &&
            examples.map<React.ReactNode>((exemple, index) => (
              <div key={index}>
                <img src={exemple.src} alt={exemple.alt} />
              </div>
            ))}
        </Slider>
      </div>
    );
  }
)`
  text-align: center;
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
  [dir='rtl'] .slick-prev {
    right: -25px;
    left: auto;
  }
  .slick-prev:before {
    content: '←';
  }
  [dir='rtl'] .slick-prev:before {
    content: '→';
  }

  .slick-next {
    right: -25px;
  }
  [dir='rtl'] .slick-next {
    right: auto;
    left: -25px;
  }
  .slick-next:before {
    content: '→';
  }
  [dir='rtl'] .slick-next:before {
    content: '←';
  }
`;

export default ExamplesSlider;
