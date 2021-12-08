import React from 'react';
import styled from 'styled-components';
import { BaseContributor } from 'libs/domain/contributor';
import ContributorModal from '../../molecules/ContributorModal/ContributorModal';
import SectionTitle from '../../atoms/Titles/SectionTitle';
import ContributorAvatar from '../../atoms/ContributorAvatar/ContributorAvatar';
import Section from '../../atoms/Section/Section';
import Button from '../../atoms/Button/Button';
import { useTranslation } from 'react-i18next';
import { getFacet } from '../../../../libs/facets/getFacet';

const StyledSectionTitle = styled(props => <SectionTitle {...props} />)`
  color: ${props => props.theme.website.secondaryColorDarker};
  margin-bottom: 10px;
  max-width: 80vw;
  line-height: 1.1;
  font-size: 32px;
  font-weight: bold;
  @media (min-width: 500px) {
    font-size: ${getFacet() === 'lmel' ? '40' : '50'}px;
  }
  @media (min-width: ${props => props.theme.tabletWidth}) {
    font-size: ${getFacet() === 'lmel' ? '50' : '60'}px;
    font-weight: normal;
  }
  @media (min-width: ${props => props.theme.desktopWidth}) {
    font-size: ${getFacet() === 'lmel' ? '52' : '62'}px;
  }
  @media (min-width: ${props =>
      parseInt(props.theme.desktopWidth) + 100 + 'px'}) {
    max-width: 60vw;
    font-size: ${getFacet() === 'lmel' ? '54' : '64'}px;
  }
  @media (min-width: ${props =>
      parseInt(props.theme.desktopWidth) + 200 + 'px'}) {
    font-size: ${getFacet() === 'lmel' ? '56' : '66'};
  }
`;

const SubTitle = styled.div`
  font-family: ${props => props.theme.website.fontFamily};
  color: ${props => props.theme.website.secondaryColorDarker};
  font-weight: normal;
  font-size: 18px;
  margin-bottom: 20px;
  text-align: center;
  width: 100%;
  max-width: 440px;
  @media (min-width: ${props => props.theme.tabletWidth}) {
    font-size: 22px;
  }
`;

const ContributorAvatars = styled.div`
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 5px -50px 30px -50px;
  @media (min-width: ${props => props.theme.tabletWidth}) {
    margin: 0;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  ${ContributorAvatar} {
    width: 80px;
    height: 80px;
    margin: 5px;
    @media (min-width: ${props => props.theme.tabletWidth}) {
      position: absolute;
      transform: scale(0.7);

      @media (min-width: 992px) {
        transform: scale(0.9);
      }
      @media (min-width: 1040px) {
        transform: none;
      }
      @media (min-width: 1300px) {
        transform: scale(1.1);
      }
      @media (min-width: 1650px) {
        transform: scale(1.2);
      }
      &:nth-child(1) {
        width: 160px;
        height: 160px;
        top: -8%;
        @media (min-width: 1040px) {
          top: -7%;
        }
        @media (min-width: 1300px) {
          top: -6%;
        }
        @media (min-width: 1650px) {
          top: -5%;
        }
        left: 30%;
      }
      &:nth-child(2) {
        width: 150px;
        height: 150px;
        bottom: -9%;
        @media (min-width: 1040px) {
          bottom: -7%;
        }
        @media (min-width: 1300px) {
          bottom: -5%;
        }
        @media (min-width: 1650px) {
          bottom: -3%;
        }
        left: 70%;
      }
      &:nth-child(3) {
        width: 140px;
        height: 140px;
        bottom: 40%;
        left: 0;
        @media (min-width: 1040px) {
          left: 2%;
        }
        @media (min-width: 1300px) {
          left: 4%;
        }
        @media (min-width: 1650px) {
          left: 6%;
        }
      }
      &:nth-child(4) {
        width: 130px;
        height: 130px;
        top: 45%;
        right: 6%;
      }
      &:nth-child(5) {
        width: 120px;
        height: 120px;
        bottom: -5%;
        left: 25%;
      }
      &:nth-child(6) {
        width: 110px;
        height: 110px;
        top: 5%;
        right: 14%;
        @media (min-width: 1040px) {
          right: 16%;
        }
        @media (min-width: 1300px) {
          right: 18%;
        }
        @media (min-width: 1650px) {
          right: 20%;
        }
      }
      &:nth-child(7) {
        width: 100px;
        height: 100px;
        bottom: 10%;
        left: 10%;
      }
      &:nth-child(8) {
        width: 95px;
        height: 95px;
        top: 12%;
        left: 55%;
      }
      &:nth-child(9) {
        width: 90px;
        height: 90px;
        bottom: 10%;
        left: 40%;
      }
      &:nth-child(10) {
        width: 85px;
        height: 85px;
        top: 15%;
        right: -2.5%;
        @media (min-width: 1040px) {
          right: -2%;
        }
        @media (min-width: 1300px) {
          right: -1.5%;
        }
        @media (min-width: 1650px) {
          right: -1%;
        }
      }
      &:nth-child(11) {
        width: 80px;
        height: 80px;
        top: 8%;
        left: 3%;
      }
      &:nth-child(12) {
        width: 75px;
        height: 75px;
        bottom: 6%;
        right: 37%;
      }
      &:nth-child(13) {
        width: 70px;
        height: 70px;
        top: 14%;
        @media (min-width: 1040px) {
          top: 15%;
        }
        @media (min-width: 1300px) {
          top: 16%;
        }
        @media (min-width: 1650px) {
          top: 17%;
        }
        left: 17%;
      }
      &:nth-child(14) {
        width: 65px;
        height: 65px;
        bottom: 19%;
        left: -2.5%;
        @media (min-width: 1040px) {
          left: -2%;
        }
        @media (min-width: 1300px) {
          left: -1.5%;
        }
        @media (min-width: 1650px) {
          left: -1%;
        }
      }
      &:nth-child(15) {
        width: 60px;
        height: 60px;
        bottom: 10%;
        right: 3%;
      }
      &:nth-child(16) {
        width: 55px;
        height: 55px;
        bottom: 30%;
        left: 22%;
      }
    }
  }
`;

export interface ContributorsSectionProps {
  className?: string;
  contributors: BaseContributor[];
}

const ContributorsSection = styled(
  ({ className, contributors }: ContributorsSectionProps) => {
    const { t } = useTranslation('website');
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [
      openedContributor,
      setOpenedContributor
    ] = React.useState<BaseContributor | null>(null);

    return (
      <>
        <Section className={className}>
          <StyledSectionTitle>
            {t('home.contributors.title')}
          </StyledSectionTitle>
          {t('home.contributors.subTitle') !== '' && (
            <SubTitle>{t('home.contributors.subTitle')}</SubTitle>
          )}
          <ContributorAvatars>
            {contributors.map<React.ReactNode>((contributor, index) => {
              // eslint-disable-next-line camelcase
              const imageUrl = contributor.avatar?.extra_large?.url
                ? contributor.avatar.extra_large.url
                : contributor.avatar?.large?.url
                ? contributor.avatar.large.url
                : 'DEFAULT';
              return (
                <ContributorAvatar
                  key={index}
                  imageUrl={imageUrl}
                  name={contributor.name}
                  handleClick={(e: React.MouseEvent<HTMLElement>) => {
                    setOpenedContributor(contributor);
                    setModalOpen(true);
                    e.preventDefault();
                  }}
                />
              );
            })}
          </ContributorAvatars>
          <Button
            color="greenDarker"
            text={t('home.contributors.buttonText')}
            icon="list"
            appearance="outline"
            handleClick={() => false}
          />
        </Section>
        {openedContributor && (
          <ContributorModal
            contributor={openedContributor}
            open={modalOpen}
            setOpen={setModalOpen}
          />
        )}
      </>
    );
  }
)`
  background-color: ${props =>
    props.theme.website.contributorSectionBackgroundColor};
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left: 15px;
  padding-right: 15px;
  @media (min-width: ${props => props.theme.tabletWidth}) {
    padding-top: 150px;
    padding-bottom: 150px;
  }
  @media (min-width: ${props => props.theme.desktopWidth}) {
    padding-top: 200px;
    padding-bottom: 200px;
  }
  button {
    position: relative;
  }
`;

export default ContributorsSection;
