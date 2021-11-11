import React, { ReactElement } from 'react';
import { StoryFn } from '@storybook/addons';
import Button, {
  buttonAppearances,
  buttonColors,
  buttonIcons,
  ButtonProps
} from './Button';

export default {
  title: 'Website/Atoms/Button',
  argTypes: {
    icon: {
      options: buttonIcons,
      control: { type: 'select' },
      default: null
    },
    appearance: {
      options: buttonAppearances,
      control: { type: 'select' },
      default: null
    },
    color: {
      options: buttonColors,
      control: { type: 'select' },
      default: null
    },
    text: {
      control: { type: 'text' }
    },
    details: {
      control: { type: 'text' }
    }
  },
  decorators: [
    (getStory: StoryFn<ReactElement>) => (
      <div
        style={{
          margin: '-1rem',
          padding: '1rem',
          background: 'white',
          height: 'calc(100vh - 2rem)'
        }}
      >
        <>{getStory()}</>
      </div>
    )
  ]
};

export const ButtonDefault = (args: ButtonProps) => <Button {...args} />;
ButtonDefault.args = {
  text: 'Default button'
} as ButtonProps;

export const ButtonSolidBlue = (args: ButtonProps) => <Button {...args} />;
ButtonSolidBlue.args = {
  appearance: 'solid',
  color: 'blue',
  icon: 'download',
  text: 'Solid blue button',
  details: 'with detail'
} as ButtonProps;

export const ButtonSolidGreen = (args: ButtonProps) => <Button {...args} />;
ButtonSolidGreen.args = {
  appearance: 'solid',
  color: 'green',
  icon: 'list',
  text: 'Solid green button',
  details: 'with detail'
} as ButtonProps;

export const ButtonSolidGreenDarker = (args: ButtonProps) => (
  <Button {...args} />
);
ButtonSolidGreenDarker.args = {
  appearance: 'solid',
  color: 'greenDarker',
  icon: 'list',
  text: 'Solid green button',
  details: 'with detail'
} as ButtonProps;

export const ButtonSolidOrange = (args: ButtonProps) => <Button {...args} />;
ButtonSolidOrange.args = {
  appearance: 'solid',
  color: 'orange',
  icon: 'coins',
  text: 'Solid orange button',
  details: 'with detail'
} as ButtonProps;

export const ButtonOutlineBlue = (args: ButtonProps) => <Button {...args} />;
ButtonOutlineBlue.args = {
  appearance: 'outline',
  color: 'blue',
  icon: 'download',
  text: 'Outline blue button',
  details: 'with detail'
} as ButtonProps;

export const ButtonOutlineGreen = (args: ButtonProps) => <Button {...args} />;
ButtonOutlineGreen.args = {
  appearance: 'outline',
  color: 'green',
  icon: 'checklist',
  text: 'Outline green button',
  details: 'with detail'
} as ButtonProps;

export const ButtonOutlineGreenDarker = (args: ButtonProps) => (
  <Button {...args} />
);
ButtonOutlineGreenDarker.args = {
  appearance: 'outline',
  color: 'greenDarker',
  icon: 'checklist',
  text: 'Outline green button',
  details: 'with detail'
} as ButtonProps;

export const ButtonOutlineOrange = (args: ButtonProps) => <Button {...args} />;
ButtonOutlineOrange.args = {
  appearance: 'outline',
  color: 'orange',
  icon: 'coins',
  text: 'Outline orange button',
  details: 'with detail'
} as ButtonProps;

export const AllButtons = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
    <ButtonDefault {...ButtonDefault.args} />
    <ButtonSolidBlue {...ButtonSolidBlue.args} />
    <ButtonSolidGreen {...ButtonSolidGreen.args} />
    <ButtonSolidGreenDarker {...ButtonSolidGreenDarker.args} />
    <ButtonSolidOrange {...ButtonSolidOrange.args} />
    <ButtonOutlineBlue {...ButtonOutlineBlue.args} />
    <ButtonOutlineGreen {...ButtonOutlineGreen.args} />
    <ButtonOutlineGreenDarker {...ButtonOutlineGreenDarker.args} />
    <ButtonOutlineOrange {...ButtonOutlineOrange.args} />
  </div>
);
