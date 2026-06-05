import { initializeApp, getApps, getApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCTyx7LV0WLcTMAdMeodsXa4MMd6PwKZ-o",
  authDomain: "hasiru-fashion.firebaseapp.com",
  projectId: "hasiru-fashion",
  storageBucket: "hasiru-fashion.firebasestorage.app",
  messagingSenderId: "802364585533",
  appId: "1:802364585533:web:835393b5adf922bf681c54",
  measurementId: "G-9TVT4MYXTD",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export { app };
