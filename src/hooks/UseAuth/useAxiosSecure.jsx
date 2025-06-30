import axios from "axios";
import { configs } from "eslint-plugin-react-refresh";
import React from "react";
import UseAuth from "./UseAuth";
// 13.0 as my requirement is perform crud operation using axios so install axios. for this crud operation with axios created as custom hook useAxiosSecure and create axios here that we can commonly use in all the crud operation.

// 13.1 so as per documentation create axios instance

// 25.0 Now our requirement is use firebase JWT to authenticate user

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});

// 13.2 commented due to it will use with secure in 25.1
/* const useAxiosSecure = () => {
  return axiosSecure;
}; */

const useAxiosSecure = () => {
  const { user } = UseAuth();
  // 25.1 as per axios interceptors doc
  axiosSecure.interceptors.request.use((config) => {
    config.headers.authorization = `Bearer ${user.accessToken}`;
    return config;
    // 25.2 Now from this step go to my parcel or payment history i.e where axiosSecure function is used go to network tab => from left select "/parcels?email=job@cob.com" in right side in headers u will find the accessToken
  });

  return axiosSecure;
};

export default useAxiosSecure;
