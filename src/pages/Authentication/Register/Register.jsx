import React, { useState } from "react";
import { useForm } from "react-hook-form";
import UseAuth from "../../../hooks/UseAuth/UseAuth";
import axios from "axios";
import useAxios from "../../../hooks/useAxios";
import { Link } from "react-router";

// 5.0 My requirement is applying react hook form in Register section
// 6.0 My requirement is show error in the form if validation is failed
const Register = () => {
  // 8.12  call the UseAuth hook to get the createUser from context
  const { createUser, updateUserProfile } = UseAuth();

  // 23.5 import useAxios
  const axiosInstance = useAxios();

  // 22.0 our requirement is implement name and image upload during registration

  // 22.5 took state for profile pic
  const [profilePic, setProfilePic] = useState("");

  // 22.3 create handleImageUpload function
  const handleImageUpload = async (e) => {
    e.preventDefault();
    const image = e.target.files[0];
    console.log(image);

    const formData = new FormData();
    formData.append("image", image);

    // 22.4 Now copy api the key from imgBB => About section at left and save to environmental variable (VITE_IMAGE_UPLOAD_KEY=8bb585f3aee70f5225d80cd5879b5dce)
    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMAGE_UPLOAD_KEY
    }`;

    const res = await axios.post(imageUploadUrl, formData);
    console.log(res.data.data.url);
    // 22.6
    setProfilePic(res.data.data.url);
  };

  // 5.3 call the onSubmit as per doc
  const onSubmit = async (data) => {
    console.log(data);
    // 8.13 create user after on Submit register form and pass the email and password as parameter
    createUser(data.email, data.password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        console.log(user);

        // 23.1 create user info to send the data to the Db
        const userInfo = {
          email: data.email,
          role: "user",
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString(),
        };

        // 23.4 send the userInfo to the db using useAxios custom hook
        const userRes = await axiosInstance.post("/users", userInfo);
        console.log(userRes.data);

        // 22.9 create object and displayName will be from data which is from react hook during onSubmit
        const profileInfo = {
          displayName: data.name,
          photoURL: profilePic,
        };

        // 22.10 pass the profileInfo
        updateUserProfile(profileInfo)
          .then(() => {
            console.log("Profile name and pic updated");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        const errorCode = err.code;
        const errorMessage = err.message;
        console.log(errorMessage, errorCode);
      });
  };
  // 5.1 destructure register, handleSubmit from useForm as per doc
  const {
    register,
    handleSubmit,
    // 6.1 destructure formState: { errors } from useForm
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    criteriaMode: "all", // ✅ important to show multiple validate errors
  });

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <h3>Create Your Account</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <fieldset className="fieldset">
          {/*Name field  */}
          <label className="label">Your Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input"
            placeholder="Your Name"
          />

          {errors.name?.type === "required" && (
            <p className="text-red-500">Email is required</p>
          )}
          {/* 22.1 Create a image field. we are not use the react hook for image */}
          {/*Image field  */}
          <label className="label">Your Image</label>
          <input
            // 22.2 implement onChange
            onChange={handleImageUpload}
            type="file"
            className="input"
            placeholder="Your Name"
          />

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
          {/* Password field */}
          <label className="label">Password</label>
          <input
            type="password"
            // 5.2.1 apply the password to get the password data
            // 6.5 apply length for password validation
            {...register("password", {
              minLength: 6,
              //   6.6 apply password pattern validation. validation works but message not showing in ui
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
          {/* 6.7 showing error for password pattern validation error. validation works but message not showing in ui */}

          {errors.password?.types && (
            <div>
              {errors.password.types?.hasLowerCase && (
                <p className="text-red-500">{errors.password?.hasLowerCase}</p>
              )}
              {errors.password.types?.hasUpperCase && (
                <p className="text-red-500">{errors.password?.hasUpperCase}</p>
              )}
              {errors.password.types?.hasNumber && (
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
          <p>
            Already have Account?{" "}
            <Link to="/login" className="hover:underline">
              {" "}
              Login
            </Link>
          </p>
        </fieldset>
      </form>
    </div>
  );
};

export default Register;
