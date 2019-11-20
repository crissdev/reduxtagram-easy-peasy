import { StoreProvider } from 'easy-peasy';
import React from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import store from '../store';
import PhotoGrid from './photo-grid';
import Single from './single';

export default function Root() {
  return (
    <>
      <StoreProvider store={store}>
        <BrowserRouter>
          <h1>
            <Link to="/">Reduxstagram</Link>
          </h1>
          <Route path="/" exact={true} component={PhotoGrid}></Route>
          <Route path="/view/:postId" component={Single} />
        </BrowserRouter>
      </StoreProvider>
    </>
  );
}
