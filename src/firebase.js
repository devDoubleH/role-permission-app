import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCXW3z5XLCSSIpM8wsKCetagfJbT8UcJIU",
  authDomain: "rolepermissionapp.firebaseapp.com",
  projectId: "rolepermissionapp",
  storageBucket: "rolepermissionapp.appspot.com",
  messagingSenderId: "347738825297",
  appId: "1:347738825297:web:b55684fd56b1ec5a4f8e70",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
