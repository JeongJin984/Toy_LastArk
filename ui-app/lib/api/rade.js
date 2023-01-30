import axios from "axios";

export const getRade = async (params) => {
  const result = await axios.get("http://localhost:8080/rade", {params})
  return result.data
}

export const postRade = async (body, params) => {
  const result = await axios.post("http://localhost:8080/rade", body,{params})
  return result.data
}