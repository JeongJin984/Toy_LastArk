import axios from "axios";
import {backURL} from "../../env";

export const getUser = async (params) => {
  const result = await axios.get(backURL + "/user/get", {params})
  return result.data
}

export const getOrSaveUser = async (params) => {
  const result = await axios.get(backURL + "/user/get/save", {params})
  return result.data
}

export const updateLostArkInfo = async (params) => {
  const result = await axios.get(backURL + "/user/update/lostark", {params})
  return result.data
}

export const getPendingRadeApply = async (params) => {
  const result = await axios.get(backURL + "/user/rade/apply", {params})
  return result.data
}

export const getFixedRadeApply = async (params) => {
  const result = await axios.get(backURL + "/user/rade/apply", {params})
  return result.data
}

export const logOut = async (params) => {
  const result = await axios.get(backURL + "/user/logout", {params})
  return result.data
}