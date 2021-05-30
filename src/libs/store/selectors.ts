import { RouteComponentProps } from 'react-router';

export const makeGetRouteParam = (param: string) => (
  state: unknown,
  { match }: RouteComponentProps<{ [_key: string]: string }>
) => match?.params[param];
