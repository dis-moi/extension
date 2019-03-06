import { AppAction } from 'app/actions';
import { Dispatch } from 'redux';

export const transformBackgroundAction = <A extends AppAction>(
  action: A
): A => ({
  ...action,
  meta: { ...action.meta, fromTab: true }
});

export const sendToBackground = (action: AppAction): Promise<string> =>
  new Promise(resolve => {
    chrome.runtime.sendMessage(action, response => resolve(response));
  });

export const backgroundPublisher = () => (next: Dispatch<AppAction>) => (
  action: AppAction
) => {
  if (action.meta && action.meta.sendToBackground) {
    sendToBackground(transformBackgroundAction(action)).then(response =>
      console.log('Background respond', response)
    );
  }

  return next(action);
};
