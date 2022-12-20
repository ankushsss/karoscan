// theme

// components

// import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';

import { MsalProvider } from '@azure/msal-react';
import ThemeProvider from './theme';
// routes
import Router from './routes';
import ScrollToTop from './components/ScrollToTop';
import { PageLayout } from './ui-components/PageLayout';
// ----------------------------------------------------------------------

export default function App({pca}) {
  return (
    
    <ThemeProvider>
      <MsalProvider instance={pca}>
      <ScrollToTop />
      {/* <BaseOptionChartStyle /> */}
           <Router />

      </MsalProvider>
    </ThemeProvider>

  );
}
