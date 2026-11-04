import React, { useEffect, useRef } from 'react';
import { Router } from 'react-router';
import { History } from 'history';
import { useStore } from 'react-redux';
import { onLocationChanged } from './actions';

interface ConnectedRouterProps {
  history: History;
  children?: React.ReactNode;
}

const ConnectedRouter = ({ history, children }: ConnectedRouterProps) => {
  const store = useStore();
  const isFirstRendering = useRef(true);

  useEffect(() => {
    // Dispatch initial location
    if (isFirstRendering.current) {
      isFirstRendering.current = false;
      store.dispatch(onLocationChanged(history.location, history.action, true));
    }

    // Listen for subsequent location changes
    const unlisten = history.listen((location, action) => {
      store.dispatch(onLocationChanged(location, action));
    });

    return unlisten;
  }, [history, store]);

  // @ts-expect-error react-router v5 types don't include children with @types/react@18
  return <Router history={history}>{children}</Router>;
};

export default ConnectedRouter;
