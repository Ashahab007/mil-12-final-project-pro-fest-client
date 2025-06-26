import React from "react";
import { useForm } from "react-hook-form";
import SocialLogin from "../SocialLogin/SocialLogin";
import UseAuth from "../../../hooks/UseAuth/UseAuth";

// 3.1 created a login component
const Login = () => {
  // 19.1 get the login from UseAuth
  const { logIn } = UseAuth();
  // 4.0 my requirement is implement react hook form
  // 4.1 npm install react-hook-form then from doc select js for every form

  // 19.3
  //   4.2 use useForm and use the register and handleSubmit function from  useForm as per doc
  const { register, handleSubmit } = useForm();

  //   4.4 call the onSubmit function form document
  const onSubmit = (data) => {
    console.log(data);
    // 19.0 Implementing user login
    // 19.2 get the email and password from data which is from react hook form
    logIn(data.email, data.password)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <h1>Log In</h1>
      {/* 4.4 apply onSubmit and also use the handleSubmit from useForm and call the onSubmit as per doc*/}
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <fieldset className="fieldset">
          <label className="label">Email</label>

          <input
            type="email"
            // 4.3.0 destructure the register and get the email
            {...register("email")}
            className="input"
            placeholder="Email"
          />
          <label className="label">Password</label>

          <input
            type="password"
            // 4.3.1 destructure the register and get the password
            {...register("password")}
            className="input"
            placeholder="Password"
          />
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
      </form>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Login;
