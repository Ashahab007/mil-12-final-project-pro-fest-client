import React from "react";
import UseAuth from "../../../hooks/UseAuth/UseAuth";

const Logout = () => {
  const { logOut } = UseAuth();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        console.log("Sign-out successful.");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <button onClick={handleLogOut} className="btn">
      Logout
    </button>
  );
};

export default Logout;
