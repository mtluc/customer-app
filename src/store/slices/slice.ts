import {
  ActionReducerMapBuilder,
  createSlice,
  CreateSliceOptions,
  Slice,
  SliceCaseReducers,
  SliceSelectors,
} from "@reduxjs/toolkit";

export interface SliceApp<ST = any, S extends Slice<ST> = Slice<ST>> {
  instance: S;
  extraReducers?: (builder: ActionReducerMapBuilder<ST>) => void;
}

export function createSliceApp<
  State,
  CaseReducers extends SliceCaseReducers<State>,
  Name extends string,
  Selectors extends SliceSelectors<State>,
  ReducerPath extends string = Name
>(
  options: CreateSliceOptions<State, CaseReducers, Name, ReducerPath, Selectors>
): SliceApp<State, Slice<State, CaseReducers, Name, ReducerPath, Selectors>> {
  return {
    instance: createSlice(options),
    extraReducers: options.extraReducers,
  };
}
