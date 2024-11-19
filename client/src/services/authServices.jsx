import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig"; 

export const handleLogin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("User logged in and data updated");
    return user; 
  } catch (error) {
    console.error("Error during login:", error.message);
    throw error; 
  }
};
