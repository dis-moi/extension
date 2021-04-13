import { MouseEvent } from 'react';
import { SET_POPIN, PopinActionReturn } from '../actions/contextPopin';

interface ButtonDescriptor {
  label?: string;
  onClick?: (params?: MouseEvent<HTMLButtonElement>) => void;
}

export interface ContextPopinState {
  content: {
    text: string;
    btn?: ButtonDescriptor;
  };
  opened: boolean;
}

export const initialState = {
  content: { text: '' },
  opened: false
};

const contextPopin = (
  state: ContextPopinState = initialState,
  action: PopinActionReturn
) => {
  switch (action.type) {
    case SET_POPIN:
      return action.payload;
    default:
      return state;
  }
};

export default contextPopin;
