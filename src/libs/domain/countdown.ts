export interface CountDownState {
  countdown: number;
  intervalID: number | null;
}

export const initialState: CountDownState = {
  countdown: 3,
  intervalID: null
};
