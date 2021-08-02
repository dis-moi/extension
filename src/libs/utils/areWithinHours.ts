import { differenceInSeconds } from 'date-fns';

export const areWithinHours = (
  dirtyDateLeft: Date,
  dirtyDateRight: Date,
  numberOfHours: number
) =>
  differenceInSeconds(dirtyDateLeft, dirtyDateRight) <= numberOfHours * 60 * 60;

export const isWithinLastHours = (date: Date, numberOfHours: number) =>
  areWithinHours(new Date(), date, numberOfHours);

export default areWithinHours;
