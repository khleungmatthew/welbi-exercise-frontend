import { createEntityAdapter, createSlice, createAsyncThunk, EntityState } from '@reduxjs/toolkit';

import * as Api from '../api';

export interface BaseEntity {
  id: string | number | null | undefined;
}

export interface BaseState {
  isFetchingOne: boolean;
  isFetchingMany: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  isCreating: boolean;
}

export type RestState<T> = EntityState<T> & BaseState;

function createRestActions<T extends BaseEntity>(entityNamePlural: string) {
  return {
    get: createAsyncThunk<T[], string | undefined>(`${entityNamePlural}/getAll`, async (queryParams = '') => {
      let query = '';
      if (queryParams !== '') {
        query = `?${queryParams}`;
      }
      return (await Api.get<T>(`${entityNamePlural}${query}`)) as T[];
    }),

    create: createAsyncThunk<T, T>(`${entityNamePlural}/create`, async (data) => {
      return (await Api.post(entityNamePlural, data)) as T;
    })
  };
}

export default function createRestService<T extends BaseEntity>(entityNamePlural: string) {
  const adapter = createEntityAdapter<T>();

  const initialState = adapter.getInitialState({
    isFetchingOne: false,
    isFetchingMany: false,
    isUpdating: false,
    isDeleting: false,
    isCreating: false
  });

  const restActions = createRestActions<T>(entityNamePlural);

  const slice = createSlice({
    name: entityNamePlural,
    initialState: initialState as RestState<T>,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(restActions.get.pending, (state, _) => {
        state.isFetchingMany = true;
      });
      builder.addCase(restActions.get.fulfilled, (state, action) => {
        state.isFetchingMany = false;
        adapter.setAll(state as RestState<T>, action.payload ?? []);
      });
      builder.addCase(restActions.get.rejected, (state, _) => {
        state.isFetchingMany = false;
      });

      builder.addCase(restActions.create.pending, (state, _) => {
        state.isCreating = true;
      });
      builder.addCase(restActions.create.fulfilled, (state, action) => {
        state.isCreating = false;
        adapter.upsertOne(state as RestState<T>, action.payload);
      });
      builder.addCase(restActions.create.rejected, (state, _) => {
        state.isCreating = false;
      });
    }
  });

  return {
    reducer: slice.reducer,
    adapter: adapter,
    actions: { ...slice.actions, ...restActions }
  };
}
