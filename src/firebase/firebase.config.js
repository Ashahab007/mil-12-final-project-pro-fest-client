// 7.1.1
import { getAuth } from "firebase/auth";

// 7.0 My requirement is apply authentication using firebase and also create a auth context

// 7.1 from "go to console" create project from firebase and enable google and email, password authentication. then go to project settings select web=> name the project=> register => npm install firebase => copy the config file and paste here. Now go to build from navbar and select "go to build" => authentication => view doc => select web => get started => copy import { getAuth } from "firebase/auth" and also copy const auth = getAuth(app) in  7.2 and export;

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfRNy_UCjLZWIAdgoJzowKl6VyBIsWtdA",
  authDomain: "mil12-prject-profast-client.firebaseapp.com",
  projectId: "mil12-prject-profast-client",
  storageBucket: "mil12-prject-profast-client.firebasestorage.app",
  messagingSenderId: "776785803669",
  appId: "1:776785803669:web:5c7880c178b24d40611e9c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 7.2 paste from  "get started" and export
export const auth = getAuth(app);
