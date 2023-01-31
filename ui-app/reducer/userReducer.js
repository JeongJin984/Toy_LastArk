import {createPromiseThunk, handleAsyncActions, reducerUtils} from "../lib/asyncUtils";
import * as userAPI from "../lib/api/user"

const GET_USER = 'GET_USER'; // 요청 시작
const GET_USER_SUCCESS = 'GET_USER_SUCCESS'; // 요청 성공
const GET_USER_ERROR = 'GET_USER_ERROR'; // 요청 실패

const SING_UP = 'SING_UP'; // 요청 시작
const SING_UP_SUCCESS = 'SING_UP_SUCCESS'; // 요청 성공
const SING_UP_ERROR = 'SING_UP_ERROR'; // 요청 실패

export const getUser = createPromiseThunk(GET_USER, userAPI.getUser);
export const signUp = createPromiseThunk(SING_UP, userAPI.signUp);

const initialState = {
  user: reducerUtils.initial()
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
    case GET_USER_SUCCESS:
    case GET_USER_ERROR:
      console.log(state, action)
      return handleAsyncActions(GET_USER, 'user')(state, action)
    case SING_UP:
    case SING_UP_SUCCESS:
    case SING_UP_ERROR:
      console.log(state, action)
      return handleAsyncActions(SING_UP, 'user')(state, action)
    default:
      return state
  }
}