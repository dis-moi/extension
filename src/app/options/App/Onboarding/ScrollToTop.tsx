import { useEffect } from 'react';
import { Location } from 'history';

interface ScrollToTopProps {
  children?: JSX.Element;
  location: Location;
}

const ScrollToTop = ({
  children,
  location: { pathname }
}: ScrollToTopProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return children || null;
};

export default ScrollToTop;
