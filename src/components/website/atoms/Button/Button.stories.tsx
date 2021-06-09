import React from 'react';
import Button, { ButtonProps } from './Button';

export default {
  title: 'Website/Atoms/Button',
  argTypes: {
    icon: {
      options: ['download', 'cheklist', 'coins', 'stats', 'github'],
      control: { type: 'select' },
      default: null
    },
    appearance: {
      options: ['solid', 'outline'],
      control: { type: 'select' },
      default: null
    },
    color: {
      options: ['blue', 'green', 'orange'],
      control: { type: 'select' },
      default: null
    },
    text: {
      control: { type: 'text' }
    },
    details: {
      control: { type: 'text' }
    }
  }
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
  icon: 'checklist',
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
    <ButtonSolidOrange {...ButtonSolidOrange.args} />
    <ButtonOutlineBlue {...ButtonOutlineBlue.args} />
    <ButtonOutlineGreen {...ButtonOutlineGreen.args} />
    <ButtonOutlineOrange {...ButtonOutlineOrange.args} />
  </div>
);
