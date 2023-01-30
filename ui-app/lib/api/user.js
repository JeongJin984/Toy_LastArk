import axios from "axios";

export const getUser = async (params) => {
  const result = await axios.get("http://localhost:8080/user", {params})
  return result.data
}
