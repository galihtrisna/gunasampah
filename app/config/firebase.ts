// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import { getAuth, connectAuthEmulator } from 'firebase/auth'

let host = '192.168.43.144'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDHTVM3iuIvGWCY0ZF7nf1vaucLSoXZzYI",
//   authDomain: "gunasampah-id.firebaseapp.com",
//   projectId: "gunasampah-id",
//   storageBucket: "gunasampah-id.appspot.com",
//   messagingSenderId: "372932378891",
//   appId: "1:372932378891:web:0999a531c7696347d3220e",
//   measurementId: "G-J4GV81N6F1"
// };
const firebaseConfig = {
  apiKey: "AIzaSyDHTVM3iuIvGWCY0ZF7nf1vaucLSoXZzYI",
  authDomain: "gunasampah-id.firebaseapp.com",
  projectId: "gunasampah-id",
  storageBucket: "gunasampah-id.appspot.com",
  messagingSenderId: "372932378891",
  appId: "1:372932378891:web:0999a531c7696347d3220e",
  measurementId: "G-J4GV81N6F1"
};


async function setupEmulators(auth: any) {
  const authUrl = `http://${host}:9099`
  await fetch(authUrl)
  connectAuthEmulator(auth, `http://${host}:9099`, { disableWarnings: true })
  // why? to make sure that emulator are loaded
}
// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore();
connectFirestoreEmulator(db, host, 8080);
const auth = getAuth();
setupEmulators(auth)
const storage = getStorage(app);
connectStorageEmulator(storage, host, 9199)
export { app, db, auth, storage }