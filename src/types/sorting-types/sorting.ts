import { SORTING_OPTIONS, SortingOptionValue } from '../../const';

export type SortingOption = (typeof SORTING_OPTIONS)[number];

export type SortOptionValueType =
  (typeof SortingOptionValue)[keyof typeof SortingOptionValue];
