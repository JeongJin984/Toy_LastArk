import {createPromiseThunk, handleAsyncActions, reducerUtils} from "../lib/asyncUtils";
import * as radeAPI from "../lib/api/rade";

const GET_RADE = 'GET_RADE'; // 요청 시작
const GET_RADE_SUCCESS = 'GET_RADE_SUCCESS'; // 요청 성공
const GET_RADE_ERROR = 'GET_RADE_ERROR'; // 요청 실패

const POST_RADE = 'POST_RADE'; // 요청 시작
const POST_RADE_SUCCESS = 'POST_RADE_SUCCESS'; // 요청 성공
const POST_RADE_ERROR = 'POST_RADE_ERROR'; // 요청 실패

export const getRade = createPromiseThunk(GET_RADE, radeAPI.getRade);
export const postRade = createPromiseThunk(POST_RADE, radeAPI.postRade);

const initialState = {
  rade: reducerUtils.initial()
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_RADE:
    case GET_RADE_SUCCESS:
    case GET_RADE_ERROR:
      console.log(state, action)
      return handleAsyncActions(GET_RADE, 'rade')(state, action)
    default:
      return state
  }
}