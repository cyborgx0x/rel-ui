/* eslint-disable import/no-extraneous-dependencies */
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import restApi from '@/api/restApi';

const persistConfig = {
  key: 'globalSetting',
  storage,
  whitelist: [],
};

// const articlePersistConfig = {
//   key: 'article',
//   storage,
//   whitelist: ['filter'],
// };

const searchPersistConfig = {
  key: 'search',
  storage,
  whitelist: ['params'],
};

const rootReducer = combineReducers({
  [restApi.reducerPath]: restApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const setupStore = () => {
  return configureStore({
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: true,
        serializableCheck: false,
      }).concat(restApi.middleware),
    reducer: persistedReducer,
  });
};

const store: ReturnType<typeof setupStore> = setupStore();

export const persistor = persistStore(store);
export default store;

export type AppState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
