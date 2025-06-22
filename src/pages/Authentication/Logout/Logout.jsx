import React from "react";
import UseAuth from "../../../hooks/UseAuth/UseAuth";

const Logout = () => {
  // 8.15.0 Implement logout features so created logOut button as component and get the logOut from custom hook UsrAuth
  const { logOut } = UseAuth();

  // 8.15.1 implement handleLogOut function
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
