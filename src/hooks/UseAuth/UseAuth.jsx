import React, { use } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext";
// 8.11 created a user's custom hook
const UseAuth = () => {
  const authInfo = use(AuthContext);
  return authInfo;
};

export default UseAuth;
