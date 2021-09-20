import React, { ComponentType, useLayoutEffect } from 'react';
import i18next from 'i18next';
import { connect } from 'react-redux';
import { removeUITitle, setUITitle } from 'app/content/store/actions/ui/title';

interface TitleProps {
  setUITitle: (title: string) => void;
  removeUITitle: () => void;
}

interface TitleManipulationProps {
  changeUITitle?: (title: string) => void;
}

const mapDispatchToProps: TitleProps = {
  setUITitle,
  removeUITitle
};
const withTitle = <TComponentProps extends {}>(title: string | undefined) => (
  Component: ComponentType<TComponentProps & TitleManipulationProps>
) => {
  const ComponentWithTitleEffect = ({
    setUITitle,
    removeUITitle,
    ...props
  }: TitleProps & TComponentProps) => {
    useLayoutEffect(() => {
      if (title) title = i18next.t(title);

      setUITitle(title || '');
      return removeUITitle;
    }, []);
    // eslint-disable-next-line
    // @ts-ignore -> We need a way to tell TypeScript that TComponentProps should not contain setUITitle, nor removeUITitle keys
    return <Component {...props} changeUITitle={setUITitle} />;
  };

  const ConnectedComponent = connect(
    null,
    mapDispatchToProps
    // eslint-disable-next-line
    // @ts-ignore
  )(ComponentWithTitleEffect);
  // eslint-disable-next-line
  // @ts-ignore
  return ConnectedComponent as ComponentType<TComponentProps>;
};

export default withTitle;
