import axios from "axios";

// 23.3 create a hook for normal axios fetch (except secure)
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});
const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
