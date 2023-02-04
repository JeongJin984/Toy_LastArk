import {createPromiseThunk, handleInitAsyncActions, reducerUtils} from "../lib/asyncUtils";
import * as userAPI from "../lib/api/user"

const GET_USER = 'GET_USER'; // 요청 시작
const GET_USER_SUCCESS = 'GET_USER_SUCCESS'; // 요청 성공
const GET_USER_ERROR = 'GET_USER_ERROR'; // 요청 실패

const GET_SAVE_USER = 'GET_SAVE_USER'; // 요청 시작
const GET_SAVE_USER_SUCCESS = 'GET_SAVE_USER_SUCCESS'; // 요청 성공
const GET_SAVE_USER_ERROR = 'GET_SAVE_USER_ERROR'; // 요청 실패

const UPDATE_LOSTARK_INFO = 'UPDATE_LOSTARK_INFO'; // 요청 시작
const UPDATE_LOSTARK_INFO_SUCCESS = 'UPDATE_LOSTARK_INFO_SUCCESS'; // 요청 성공
const UPDATE_LOSTARK_INFO_ERROR = 'UPDATE_LOSTARK_INFO_ERROR'; // 요청 실패

const GET_FIXED_RADE_APPLY = 'GET_FIXED_RADE_APPLY'; // 요청 시작
const GET_FIXED_RADE_APPLY_SUCCESS = 'GET_FIXED_RADE_APPLY_SUCCESS'; // 요청 성공
const GET_FIXED_RADE_APPLY_ERROR = 'GET_FIXED_RADE_APPLY_ERROR'; // 요청 실패

const GET_PENDING_RADE_APPLY = 'GET_PENDING_RADE_APPLY'; // 요청 시작
const GET_PENDING_RADE_APPLY_SUCCESS = 'GET_PENDING_RADE_APPLY_SUCCESS'; // 요청 성공
const GET_PENDING_RADE_APPLY_ERROR = 'GET_PENDING_RADE_APPLY_ERROR'; // 요청 실패

const LOG_OUT = 'LOG_OUT'; // 요청 시작
const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS'; // 요청 성공
const LOG_OUT_ERROR = 'LOG_OUT_ERROR'; // 요청 실패

export const getUser = createPromiseThunk(GET_USER, userAPI.getUser);
export const getOrSaveUser = createPromiseThunk(GET_SAVE_USER, userAPI.getOrSaveUser);
export const updateLostArkInfo = createPromiseThunk(UPDATE_LOSTARK_INFO, userAPI.updateLostArkInfo)
export const getFixedRadeApply = createPromiseThunk(GET_FIXED_RADE_APPLY, userAPI.getFixedRadeApply)
export const getPendingRadeApply = createPromiseThunk(GET_PENDING_RADE_APPLY, userAPI.getPendingRadeApply)
export const logOut = createPromiseThunk(LOG_OUT, userAPI.logOut)

const initialState = {
  user: reducerUtils.initial(),
  fixedApply: reducerUtils.initial(),
  pendingApply: reducerUtils.initial()
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
    case GET_USER_SUCCESS:
    case GET_USER_ERROR:
      console.log(state, action)
      return handleInitAsyncActions(GET_USER, 'user')(state, action)
    case GET_SAVE_USER:
    case GET_SAVE_USER_SUCCESS:
    case GET_SAVE_USER_ERROR:
      console.log(state, action)
      return handleInitAsyncActions(GET_SAVE_USER, 'user')(state, action)
    case GET_FIXED_RADE_APPLY:
    case GET_FIXED_RADE_APPLY_SUCCESS:
    case GET_FIXED_RADE_APPLY_ERROR:
      return handleInitAsyncActions(GET_FIXED_RADE_APPLY, 'fixedApply')(state, action)
    case GET_PENDING_RADE_APPLY:
    case GET_PENDING_RADE_APPLY_SUCCESS:
    case GET_PENDING_RADE_APPLY_ERROR:
      return handleInitAsyncActions(GET_PENDING_RADE_APPLY, 'pendingApply')(state, action)
    case LOG_OUT_SUCCESS:
      state = {
        ...state,
        user: {
          loading: false,
          data: null,
          error: null
        }
      }
      return state
    default:
      return state
  }
}