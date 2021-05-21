import React from 'react';
import styled from 'styled-components';
import { Follower, Message } from 'components/atoms/icons';
import LogoDismoi from 'components/atoms/LogoDismoi';
import Avatar from 'components/molecules/Avatar/Avatar';

const Container = styled.div`
  width: 100%;
  max-width: 1260px;
  margin: 0 auto;
  background-color: #f0f9fd;

  &,
  & * {
    box-sizing: border-box;
  }
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 0px 6px #00000026;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 16px;
`;

const LogoutLink = styled.a`
  margin-left: auto;
`;

const Content = styled.main`
  margin: 0 24px;
`;

const MetricsWrapper = styled.section`
  display: flex;
  align-items: center;
`;

const Metrics = styled(Box)`
  display: flex;
  align-items: center;
  padding: 12px 18px;
  min-width: 180px;
  margin-left: 40px;

  h2 {
    margin: 0;
    font-size: 22px;
  }

  span {
    display: block;
    font-size: 16px;
    font-weight: normal;
  }

  svg {
    width: auto;
    height: 36px;
    margin-right: 12px;
    fill: ${props => props.theme.activeColor};
  }
`;

const Contributor = styled.h1`
  display: flex;
  align-items: center;

  ${Avatar} {
    margin-right: 16px;
  }
`;

const StatsWrapper = styled(Box)`
  margin-bottom: 30px;
  padding: 12px 30px 30px 22px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 0px 6px #00000026;
`;

const Stats = styled.table`
  width: 100%;
  border: 2px solid #e0efff;
  border-collapse: collapse;
`;

const StatsName = styled.th`
  text-align: center;
  font-weight: bold;
  background-color: #e0efff;
`;

const StatsData = styled.td`
  padding: 6px;
  text-align: center;
  line-height: 1.1;
  border: 1px solid #e0efff;
`;

const StatsNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
`;

const Pagination = styled.div``;

const Dashboard = () => {
  return (
    <Container>
      <Header>
        <LogoDismoi />

        <LogoutLink>Logout</LogoutLink>
      </Header>

      <Content>
        <MetricsWrapper>
          <Contributor>
            <Avatar size="normal" />
            60 Millions de Consommateurs
          </Contributor>

          <Metrics>
            <Message />
            <h2>
              1250 <span>Contributions</span>
            </h2>
          </Metrics>

          <Metrics>
            <Follower />
            <h2>
              18.7 <span>Abonnés</span>
            </h2>
          </Metrics>
        </MetricsWrapper>

        <StatsWrapper as="section">
          <h3>Dans les 90 derniers jours</h3>
          <Stats>
            <thead>
              <tr>
                <StatsName>Nom</StatsName>
                <StatsName>Visibilité</StatsName>
                <StatsName>Badge</StatsName>
                <StatsName>Vu</StatsName>
                <StatsName>Ouvert</StatsName>
                <StatsName>% Ouvert</StatsName>
                <StatsName>Clics</StatsName>
                <StatsName>% Clics</StatsName>
                <StatsName>Supprimé</StatsName>
                <StatsName>Créé</StatsName>
              </tr>
            </thead>

            <tbody>
              <tr>
                <StatsData>LeMonde-smartphone</StatsData> {/* Nom */}
                <StatsData>Public</StatsData> {/* Visibilité */}
                <StatsData>1</StatsData> {/* Badge */}
                <StatsData>1</StatsData> {/* Vu */}
                <StatsData>0</StatsData> {/* Ouvert */}
                <StatsData>1</StatsData> {/* % Ouvert */}
                <StatsData>5</StatsData> {/* Clic */}
                <StatsData>1</StatsData> {/* % Clics */}
                <StatsData>1</StatsData> {/* Supprimé */}
                <StatsData>13/01/21</StatsData> {/* Créé */}
              </tr>
            </tbody>
          </Stats>

          <StatsNav>
            <div>
              Résultats par page
              <select name="" id="">
                <option value="">10</option>
                <option value="">20</option>
                <option value="">30</option>
              </select>
            </div>

            <Pagination>
              <span>1</span>
              <a href="#_">2</a>
              <a href="#_">3</a>
              <a href="#_">5</a>
              <span>…</span>
              <a href="#_">25</a>
              <a href="#_">Next</a>
              <a href="#_">Last</a>
            </Pagination>
          </StatsNav>
        </StatsWrapper>
      </Content>
    </Container>
  );
};
export default Dashboard;
