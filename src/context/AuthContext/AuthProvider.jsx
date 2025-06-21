import React from "react";
import { AuthContext } from "./AuthContext";
// 7.4 create provider
const AuthProvider = ({ children }) => {
  // 7.4.1
  const authInfo = {};
  // 7.4.2
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
