import { CloseFunction } from '../OnBoarding';

export interface StepProps {
  next?: () => void;
  prev?: () => void;
  close?: CloseFunction;
}

export { default as Step1 } from './Step1';
export { default as Step2 } from './Step2';
export { default as Step3 } from './Step3';
