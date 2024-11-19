import { signInWithEmailAndPassword } from "firebase/auth";
import { saveUserData } from "./firebaseServices"; 
import { auth } from "../firebaseConfig"; 
export const handleLogin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await saveUserData(user.uid, email, ""); ]

    console.log("User logged in and data updated");
    return user; 
  } catch (error) {
    console.error("Error during login:", error.message);
    throw error; 
  }
};
