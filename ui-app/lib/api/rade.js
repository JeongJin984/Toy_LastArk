import axios from "axios";
import {backURL} from "../../env";

axios.defaults.withCredentials = true

export const getRade = async (params) => {
  const result = await axios.get(backURL + "/rade", {params})
  return result.data
}

export const postRade = async (body, params) => {
  const result = await axios.post(backURL + "/rade", body,{params})
  return result.data
}

export const radeApply = async (body, params) => {
  const result = await axios.post(backURL + "/rade/apply", body,{params})
  return result.data
}

export const radeApplyReject = async (body, params) => {
  const result = await axios.post(backURL + "/rade/apply/reject", body,{params})
  return result.data
}

export const radeMemberAbort = async (body, params) => {
  const result = await axios.post(backURL + "/rade/abort", body,{params})
  return result.data
}

export const radeApplyCancel = async (body, params) => {
  const result = await axios.post(backURL + "/rade/apply/cancel", body,{params})
  return result.data
}

export const radeCancel = async (body, params) => {
  const result = await axios.post(backURL + "/rade/cancel", body,{params})
  return result.data
}

export const radeApplyAccept = async (body, params) => {
  const result = await axios.post(backURL + "/rade/apply/accept", body,{params})
  return result.data
}