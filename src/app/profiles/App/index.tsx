import React from 'react';
import { ThemeProvider } from 'styled-components';
import { ConnectedRouter } from 'connected-next-router';

import theme from 'app/theme';
import Background from './Background';
import PageContainer from './PageContainer';
import Pages from './Pages';

const App = () => (
  <ThemeProvider theme={theme}>
    <ConnectedRouter>
      <Background>
        <PageContainer>
          <Pages />
        </PageContainer>
      </Background>
    </ConnectedRouter>
  </ThemeProvider>
);

export default App;
