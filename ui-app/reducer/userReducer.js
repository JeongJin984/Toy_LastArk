import {createPromiseThunk, handleAsyncActions, reducerUtils} from "../lib/asyncUtils";
import * as userAPI from "../lib/api/user"

const GET_USER = 'GET_USER'; // 요청 시작
const GET_USER_SUCCESS = 'GET_USER_SUCCESS'; // 요청 성공
const GET_USER_ERROR = 'GET_USER_ERROR'; // 요청 실패

export const getUser = createPromiseThunk(GET_USER, userAPI.getUser);

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
    default:
      return state
  }
}