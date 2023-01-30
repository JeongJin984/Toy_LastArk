import {HYDRATE} from "next-redux-wrapper";
import { combineReducers } from "redux"

import CommunityReducer from "./communityReducer"
import UserReducer from "./userReducer"
import RadeReducer from "./radeReducer"

const combinedReducer = combineReducers({
  CommunityReducer,
  UserReducer,
  RadeReducer
})

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    if (state.count) nextState.count = state.count; // preserve count value on client side navigation
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

export default reducer