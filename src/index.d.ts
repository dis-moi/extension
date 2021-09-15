declare module '*.jpg';
declare module '*.png';
declare module '*.mp4' {
  const src: string;
  export default src;
}
// eslint-disable-next-line import/order
declare module 'react-adobe-animate';
