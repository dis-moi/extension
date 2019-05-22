import { useEffect } from 'react';

export default interface ScreenProps {
  setUITitle?: (arg0?: string) => void;
  removeUITitle?: () => void;
}

export const useUITitleEffect = ({
  setUITitle,
  removeUITitle
}: ScreenProps) => (title?: string) => {
  if (setUITitle && removeUITitle) {
    useEffect(() => {
      setUITitle(title);
      return removeUITitle;
    }, []);
  }
};
