import { RouteComponentProps } from 'react-router';

export const makeGetRouteParam = (param: string) => (
  state: unknown,
  { match: { params } }: RouteComponentProps<{ [_key: string]: string }>
) => params[param];
