import {createStore, AnyAction, Store, applyMiddleware} from 'redux';
import {createWrapper, Context, HYDRATE} from 'next-redux-wrapper';
import createSagaMiddleware from 'redux-saga'
import reducer from "../reducer/rootReducer";
import thunk from "redux-thunk";

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

// create a makeStore function
const initStore = () => {
  return createStore(reducer, bindMiddleware([thunk]))
}

// export an assembled wrapper
export const wrapper = createWrapper(initStore);