import React, { ComponentType, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { removeUITitle, setUITitle } from '../content/actions/ui/title';

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

  return ConnectedComponent as ComponentType<TComponentProps>;
};

export default withTitle;
