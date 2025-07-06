import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/firebase.config";

// 8.14.1 import provider
const provider = new GoogleAuthProvider();

// 7.4 create provider
const AuthProvider = ({ children }) => {
  // 8.0 My requirement is create createUserWithEmailAndPassword, signInWithEmailAndPassword, logout and SocialLogin with onAuthStateChange and apply loading. Also create a custom hook for user to avoid call the user by AuthContext in every required component

  // 8.7 took user state
  const [user, setUser] = useState(null);
  // 8.10 took state for loading by default false
  const [loading, setLoading] = useState(true);

  // 8.1 create createUserWithEmailAndPassword
  const createUser = (email, password) => {
    // 8.10.1 set the setLoading true
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // 8.3 create signInUser
  const logIn = (email, password) => {
    // 8.10.2 set the setLoading true
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // 8.5 create signOut
  const logOut = () => {
    // 8.10.3 set the setLoading true
    setLoading(true);
    return signOut(auth);
  };

  // 8.14 create SocialLogin
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  // 22.7 create update user from firebase doc
  const updateUserProfile = (profileInfo) => {
    setLoading(true);
    return updateProfile(auth.currentUser, profileInfo);
  };

  // 8.6 creating onAuthStateChange to observe the user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("user in on auth state change", currentUser);
      // 8.8 set the currentUser in state
      setUser(currentUser);

      // 8.10.4 set the setLoading false when user logged in
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 7.4.1 created authInfo
  // 8.2 send to authInfo
  // 8.4 send to authInfo
  // 8.5 send to authInfo
  // 8.9 send the user
  // 8.10.5 send the loading
  // 22.8 send the updateUserProfile
  const authInfo = {
    createUser,
    logIn,
    logOut,
    user,
    loading,
    googleSignIn,
    updateUserProfile,
  };

  // 7.4.2
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
