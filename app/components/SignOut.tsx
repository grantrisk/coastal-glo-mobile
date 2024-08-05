import React from "react";
import { auth } from "../lib/firebase";
import styles from "../../styles/SignOut.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignOut: React.FC = () => {
  const handleSignOut = async () => {
    try {
      await toast.promise(auth.signOut(), {
        pending: "Signing out...",
        success: "Signed out successfully.",
        error: "An error occurred. Please try again.",
      });
    } catch (error) {
      console.error("Sign-out failed:", error);
    }
  };

  return (
    <button className={styles.button} onClick={handleSignOut}>
      Sign Out
    </button>
  );
};

export default SignOut;
