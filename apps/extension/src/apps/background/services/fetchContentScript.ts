const getText = (response: Response): Promise<string> => response.text();

export const fetchContentScript = (input: string): Promise<string> =>
  fetch(`.${input}`).then(getText);

export default fetchContentScript;
