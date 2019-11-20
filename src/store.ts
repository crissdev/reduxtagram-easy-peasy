import { createStore } from 'easy-peasy';
import { storeModel } from './model';

const store = createStore(storeModel, { devTools: process.env.NODE_ENV === 'development' });

export default store;
