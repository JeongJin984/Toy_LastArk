import axios from "axios";

export const getUser = async (params) => {
  const result = await axios.get("http://localhost:8080/user/", {params})
  return result.data
}

export const signUp = async (body, params) => {
  const result = await axios.post("http://localhost:8080/signUp/", body,{params})
  return result.data
}
