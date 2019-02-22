import React from 'react';
import { render } from 'react-dom';
import {StyleSheetManager, ThemeProvider} from 'styled-components';

import 'typeface-lato';
import 'typeface-sedgwick-ave';

import { Provider } from 'react-redux';
import store from './store';
import theme from '../theme';
import { create, appendToBody } from './extensionIframe';
import { CanShowIframeLoadingP } from './setup';
import App from './App';

// const iframe = create({
//   style: theme.iframe.style,
// });
//
// store.subscribe(() => {
//   if (!store.getState().get('open')) {
//     iframe.remove();
//     console.log('REMOVED');
//   } else {
//     appendToBody(iframe)
//       .then((contentDocument) => {
//         const root = document.createElement('div');
//         contentDocument.body.appendChild(root);
//
//         render(
//           <StyleSheetManager target={contentDocument.head}>
//             <Provider store={store}>
//               <ThemeProvider theme={theme}>
//                 <App />
//               </ThemeProvider>
//             </Provider>
//           </StyleSheetManager>,
//           root
//         );
//       });
//     console.log('APPENDED');
//   }
// });

//
// append(iframe)
//   .then(({ contentDocument }) => {
//     const root = document.createElement('div');
//     contentDocument.body.appendChild(root);
//
//     render(
//       <StyleSheetManager target={contentDocument.head}>
//         <Provider store={store}>
//           <ThemeProvider theme={theme}>
//             <App />
//           </ThemeProvider>
//         </Provider>
//       </StyleSheetManager>,
//       root
//     );
//   });
//
//
//
//
//
//
// // Let the page load a bit before showing the iframe in loading mode
// CanShowIframeLoadingP
//   .then(() => new Promise((resolve) => {
//     const iframe = create({
//       style: theme.iframe.style,
//       onLoad: () => { resolve(iframe); }
//     });
//
//     document.body.appendChild(iframe);
//
//     store.subscribe(() => {
//       console.log(store.getState().get('open'));
//       if (!store.getState().get('open')) {
//         iframe.remove();
//         console.log('REMOVED');
//       } else {
//
//
//         console.log('APPENDED');
//       }
//     });
//   })
//     .then(({ contentDocument }) => {
//       const root = document.createElement('div');
//       contentDocument.body.appendChild(root);
//
//       render(
//         <StyleSheetManager target={contentDocument.head}>
//           <Provider store={store}>
//             <ThemeProvider theme={theme}>
//               <App />
//             </ThemeProvider>
//           </Provider>
//         </StyleSheetManager>,
//         root
//       );
//     }));
