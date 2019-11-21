import { createStore } from 'easy-peasy';
import { storeModel } from './model';

const store = createStore(storeModel, { devTools: process.env.NODE_ENV === 'development' });

// Wrapping dev only code like this normally gets stripped out by bundlers
// such as Webpack when creating a production build.
if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept('./model', () => {
      store.reconfigure(storeModel); // 👈 Here is the magic
    });
  }
}

export default store;
