import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCEMBGzfRiohW2EJIHwDYRgL_viun3U6T0",
  authDomain: "sonix-d9efc.firebaseapp.com",
  projectId: "sonix-d9efc",
  storageBucket: "sonix-d9efc.firebasestorage.app",
  messagingSenderId: "694355746520",
  appId: "1:694355746520:web:a91fc4c3de6d71b47ac1ad",
  measurementId: "G-3F3GCW83YD",
};

const app = initializeApp(firebaseConfig);


export const messaging = getMessaging(app);
