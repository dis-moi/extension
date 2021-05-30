export class APIStatusCodeError extends Error {
  public readonly response: Response;
  public readonly statusCode: number;

  constructor(response: Response) {
    super('Bad response from server');
    this.name = 'APIStatusCodeError';
    this.response = response;
    this.statusCode = response.status;
  }
}
