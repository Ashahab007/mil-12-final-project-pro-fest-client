import React from "react";
import { useForm } from "react-hook-form";
import { data } from "react-router";

// 5.0 My requirement is applying react hook form in Register section
// 6.0 My requirement is show error in the form if validation is failed
const Register = () => {
  // 5.3 call the onSubmit as per doc
  const onSubmit = (data) => {
    console.log(data);
  };
  // 5.1 destructure register, handleSubmit from useForm as per doc
  const {
    register,
    handleSubmit,
    // 6.1 destructure formState: { errors } from useForm
    formState: { errors },
  } = useForm();

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <h3>Create Your Account</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input
            type="email"
            // 5.2.0 apply the register to get the email data
            // 6.2 apply the validation for required
            {...register("email", { required: true })}
            className="input"
            placeholder="Email"
          />
          {/* 6.3 show error if validation fails*/}
          {errors.email?.type === "required" && (
            <p className="text-red-500">Email is required</p>
          )}
          <label className="label">Password</label>
          <input
            type="password"
            // 5.2.1 apply the password to get the password data
            // 6.5 apply length for password validation
            {...register("password", {
              minLength: 6,
              //   6.6 apply password pattern validation for but not working
              validate: {
                hasLowerCase: (value) =>
                  /[a-z]/.test(value) ||
                  "Password must contain at least one lowercase letter",
                hasUpperCase: (value) =>
                  /[A-Z]/.test(value) ||
                  "Password must contain at least one uppercase letter",
                hasNumber: (value) =>
                  /\d/.test(value) ||
                  "Password must contain at least one number",
              },
            })}
            className="input"
            placeholder="Password"
          />
          {/* 6.4 show error if validation is failed for password length */}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500">
              Password at least 6 characters or more
            </p>
          )}
          {/* 6.7 showing error for password pattern validation error but not working */}

          {errors.password && (
            <div>
              {errors.password?.hasLowerCase && (
                <p className="text-red-500">{errors.password?.hasLowerCase}</p>
              )}
              {errors.password?.hasUpperCase && (
                <p className="text-red-500">{errors.password?.hasUpperCase}</p>
              )}
              {errors.password?.hasNumber && (
                <p className="text-red-500">{errors.password?.hasNumber}</p>
              )}
            </div>
          )}

          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button type="submit" className="btn btn-neutral mt-4">
            Register
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default Register;
