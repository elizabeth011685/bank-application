import firebase from "firebase/compat/app";
import "firebase/compat/auth";

var firebaseConfig = {
    apiKey: "AIzaSyD7cfJTZ2ZSzLm34umxc9l2ZD09o4oWrEQ",
    authDomain: "mit-bank-application.firebaseapp.com",
    databaseURL: "",
    projectId: "mit-bank-application",
    storageBucket: "mit-bank-application.appspot.com",
    messagingSenderId: "97317733281",
    appId: "1:97317733281:web:cbf4b766e6a789bc8401e0",
};

firebase.initializeApp(firebaseConfig);

export default firebase;