import axios from "axios";
import React from "react";
// 13.0 as my requirement is perform crud operation using axios so install axios. for this crud operation with axios created as custom hook useAxiosSecure and create axios here that we can commonly use in all the crud operation.

// 13.1 so as per documentation create axios instance

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});
const useAxiosSecure = () => {
  // 13.2
  return axiosSecure;
};

export default useAxiosSecure;
