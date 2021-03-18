import { CloseFunction } from '../../index';

export interface StepTypes {
  next?: () => void;
  prev?: () => void;
  close?: CloseFunction;
}

export { default as Step1 } from './Step1';
export { default as Step2 } from './Step2';
