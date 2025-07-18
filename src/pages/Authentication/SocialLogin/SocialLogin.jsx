import React from "react";
import UseAuth from "../../../hooks/UseAuth/UseAuth";
import { useNavigate } from "react-router";
import useAxios from "../../../hooks/useAxios";

// 8.14.2 create a SocialLogin component
const SocialLogin = ({ from }) => {
  // 8.14.3 call the googleSignIn
  const { googleSignIn } = UseAuth();

  const axiosInstance = useAxios();
  // 20.6
  // const location = useLocation();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    googleSignIn()
      .then(async (result) => {
        // The signed-in user info.
        const data = result.user;
        navigate(from);
        console.log("Login with google", data.email);

        //24.0 my requirement is create a user database to save user data during SocialLogin and also check if the user is present during SocialLogin it will not create user in db but if not present it will create user in db. By default add the user role=user. same as 23.0
        const userInfo = {
          email: data.email,
          role: "user",
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString(),
        };

        // 24.1 send the userInfo to the db using useAxios custom hook
        const userRes = await axiosInstance.post("/users", userInfo);
        console.log(userRes.data);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error from googleSignIn", errorCode, errorMessage);
      });
  };

  return (
    <div>
      <div className="flex items-center w-full my-4">
        <hr className="w-full dark:text-gray-600" />
        <p className="px-3 dark:text-gray-600">OR</p>
        <hr className="w-full dark:text-gray-600" />
      </div>
      <button
        onClick={handleGoogleSignIn}
        className="btn bg-white text-black border-[#e5e5e5] flex"
      >
        <svg
          aria-label="Google logo"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <g>
            <path d="m0 0H512V512H0" fill="#fff"></path>
            <path
              fill="#34a853"
              d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
            ></path>
            <path
              fill="#4285f4"
              d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
            ></path>
            <path
              fill="#fbbc02"
              d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
            ></path>
            <path
              fill="#ea4335"
              d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
            ></path>
          </g>
        </svg>
        Login with Google
      </button>
    </div>
  );
};

export default SocialLogin;
