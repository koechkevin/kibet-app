import { applyMiddleware, createStore } from 'redux';
import reducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const middleWares: any[] = [];

const devMiddleWares: any[] = [
  ...middleWares,
//  Add dev only middle wares here
];

const middleware =
  process.env.NODE_ENV === 'development'
    ? composeWithDevTools(applyMiddleware(...devMiddleWares))
    : applyMiddleware(...middleWares);

export default createStore(reducer, middleware);
