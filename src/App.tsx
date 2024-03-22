import Home from "./component/Home";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth ,GoogleAuthProvider} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTpP6z7Iq-VxzCxVjdoB7a6mEWjLf9wZs",
  authDomain: "capstone-b4f40.firebaseapp.com",
  projectId: "capstone-b4f40",
  storageBucket: "capstone-b4f40.appspot.com",
  messagingSenderId: "808796740796",
  appId: "1:808796740796:web:2f3d8f84b974b07b5744b9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const Storage = getStorage(app);
export const provider = new GoogleAuthProvider();

function App() {
  return (
    <>
      <Home />
    </>
  );
}

export default App;


// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

