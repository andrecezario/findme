import { applyMiddleware, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import thunk from 'redux-thunk';

import reducers from './ducks';

const persistConfig = {
  key: 'root',
  storage,
  whiteList: ['coordinates'],
};

const persistedReducer = persistReducer(persistConfig, reducers);
const middleware = applyMiddleware(thunk);

const store = createStore(persistedReducer, middleware);
const persistor = persistStore(store);

export { store, persistor };