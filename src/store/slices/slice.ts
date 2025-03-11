/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ActionReducerMapBuilder,
  CaseReducerActions,
  createSlice,
  CreateSliceOptions,
  Slice,
  SliceCaseReducers,
  SliceSelectors
} from '@reduxjs/toolkit';

export interface SliceApp<ST = any, S extends Slice<ST> = Slice<ST>, CaseReducers extends SliceCaseReducers<ST> = any,
  Name extends string = any> {
  instance: S
  extraReducers?: (builder: ActionReducerMapBuilder<ST>) => void,
  actions: CaseReducerActions<CaseReducers, Name>
}

export function createSliceApp<
  State,
  CaseReducers extends SliceCaseReducers<State>,
  Name extends string,
  Selectors extends SliceSelectors<State>,
  ReducerPath extends string = Name
>(
  options: CreateSliceOptions<State, CaseReducers, Name, ReducerPath, Selectors>
): SliceApp<State, Slice<State, CaseReducers, Name, ReducerPath, Selectors>, CaseReducers, Name> {
  const instance = createSlice(options);
  return {
    instance: instance,
    extraReducers: options.extraReducers,
    actions: instance.actions
  }
}
