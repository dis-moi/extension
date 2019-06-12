import React, { ComponentType, useEffect } from 'react';
import { connect } from 'react-redux';
import { removeUITitle, setUITitle } from '../content/actions/ui/title';

interface TitleProps {
  setUITitle: (title: string) => void;
  removeUITitle: () => void;
}

const mapDispatchToProps: TitleProps = {
  setUITitle,
  removeUITitle
};

const withTitle = <TComponentProps extends {}>(title: string) => (
  Component: ComponentType<TComponentProps>
) => {
  const ComponentWithTitleEffect = ({
    setUITitle,
    removeUITitle,
    ...props
  }: TitleProps & TComponentProps) => {
    useEffect(() => {
      setUITitle(title);
      return removeUITitle;
    }, []);

    // @ts-ignore -> We need a way to tell TypeScript that TComponentProps should not contain setUITitle, nor removeUITitle keys
    return <Component {...props} />;
  };

  const ConnectedComponent = connect(
    null,
    mapDispatchToProps
    // @ts-ignore
  )(ComponentWithTitleEffect);

  return ConnectedComponent as ComponentType<TComponentProps>;
};

export default withTitle;
