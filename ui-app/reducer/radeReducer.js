import {createPromiseThunk, handleInitAsyncActions, reducerUtils} from "../lib/asyncUtils";
import * as radeAPI from "../lib/api/rade";

const GET_RADE = 'GET_RADE'; // 요청 시작
const GET_RADE_SUCCESS = 'GET_RADE_SUCCESS'; // 요청 성공
const GET_RADE_ERROR = 'GET_RADE_ERROR'; // 요청 실패

const POST_RADE = 'POST_RADE'; // 요청 시작
const POST_RADE_SUCCESS = 'POST_RADE_SUCCESS'; // 요청 성공
const POST_RADE_ERROR = 'POST_RADE_ERROR'; // 요청 실패

const APPLY_RADE = 'APPLY_RADE'; // 요청 시작
const APPLY_RADE_SUCCESS = 'APPLY_RADE_SUCCESS'; // 요청 성공
const APPLY_RADE_ERROR = 'APPLY_RADE_ERROR'; // 요청 실패

const GET_APPLY_RADE = 'GET_APPLY_RADE'; // 요청 시작
const GET_APPLY_RADE_SUCCESS = 'GET_APPLY_RADE_SUCCESS'; // 요청 성공
const GET_APPLY_RADE_ERROR = 'GET_APPLY_RADE_ERROR'; // 요청 실패

const REJECT_RADE_APPLY = 'REJECT_RADE_APPLY'; // 요청 시작
const REJECT_RADE_APPLY_SUCCESS = 'REJECT_RADE_APPLY_SUCCESS'; // 요청 성공
const REJECT_RADE_APPLY_ERROR = 'REJECT_RADE_APPLY_ERROR'; // 요청 실패

const ACCEPT_RADE_APPLY = 'ACCEPT_RADE_APPLY'; // 요청 시작
const ACCEPT_RADE_APPLY_SUCCESS = 'ACCEPT_RADE_APPLY_SUCCESS'; // 요청 성공
const ACCEPT_RADE_APPLY_ERROR = 'ACCEPT_RADE_APPLY_ERROR'; // 요청 실패

const CANCEL_RADE_APPLY = 'CANCEL_RADE_APPLY'; // 요청 시작
const CANCEL_RADE_APPLY_SUCCESS = 'CANCEL_RADE_APPLY_SUCCESS'; // 요청 성공
const CANCEL_RADE_APPLY_ERROR = 'CANCEL_RADE_APPLY_ERROR'; // 요청 실패

const CANCEL_RADE = 'CANCEL_RADE'; // 요청 시작
const CANCEL_RADE_SUCCESS = 'CANCEL_RADE_SUCCESS'; // 요청 성공
const CANCEL_RADE_ERROR = 'CANCEL_RADE_ERROR'; // 요청 실패

const ABORT_RADE_MEMBER = 'ABORT_RADE_MEMBER'; // 요청 시작
const ABORT_RADE_MEMBER_SUCCESS = 'ABORT_RADE_MEMBER_SUCCESS'; // 요청 성공
const ABORT_RADE_MEMBER_ERROR = 'ABORT_RADE_MEMBER_ERROR'; // 요청 실패

export const getRade = createPromiseThunk(GET_RADE, radeAPI.getRade);
export const postRade = createPromiseThunk(POST_RADE, radeAPI.postRade);
export const radeApply = createPromiseThunk(APPLY_RADE, radeAPI.radeApply);
export const radeApplyReject = createPromiseThunk(REJECT_RADE_APPLY, radeAPI.radeApplyReject);
export const radeApplyAccept = createPromiseThunk(ACCEPT_RADE_APPLY, radeAPI.radeApplyAccept);
export const radeApplyCancel = createPromiseThunk(CANCEL_RADE_APPLY, radeAPI.radeApplyCancel);
export const radeCancel = createPromiseThunk(CANCEL_RADE, radeAPI.radeCancel);
export const radeMemberAbort = createPromiseThunk(ABORT_RADE_MEMBER, radeAPI.radeMemberAbort);

const initialState = {
  rade: reducerUtils.initial(),
  radeApplied: reducerUtils.initial()
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_RADE:
    case GET_RADE_SUCCESS:
    case GET_RADE_ERROR:
      return handleInitAsyncActions(GET_RADE, 'rade')(state, action)
    case APPLY_RADE:
    case APPLY_RADE_SUCCESS:
    case APPLY_RADE_ERROR:
      return handleInitAsyncActions(APPLY_RADE, 'radeApplied')(state, action)
    case GET_APPLY_RADE:
    case GET_APPLY_RADE_SUCCESS:
    case GET_APPLY_RADE_ERROR:
      return handleInitAsyncActions(GET_RADE, 'radeApply')(state, action)
    case REJECT_RADE_APPLY:
    case REJECT_RADE_APPLY_SUCCESS:
    case REJECT_RADE_APPLY_ERROR:
      return state
    case ACCEPT_RADE_APPLY:
    case ACCEPT_RADE_APPLY_SUCCESS:
    case ACCEPT_RADE_APPLY_ERROR:
      return state
    case CANCEL_RADE_APPLY:
    case CANCEL_RADE_APPLY_SUCCESS:
    case CANCEL_RADE_APPLY_ERROR:
      return state
    case CANCEL_RADE:
    case CANCEL_RADE_SUCCESS:
    case CANCEL_RADE_ERROR:
      return state
    case ABORT_RADE_MEMBER:
    case ABORT_RADE_MEMBER_SUCCESS:
    case ABORT_RADE_MEMBER_ERROR:
      return state
    default:
      return state
  }
}