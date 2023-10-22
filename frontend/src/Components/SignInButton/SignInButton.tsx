import React from "react";
import styles from "./SignInButton.module.scss";
import { googleSignIn, saveUserInfo } from "../../Firebase";

interface ISignInButton {
  className?: string;
}

const SignInButton: React.FC<ISignInButton> = ({ className }) => {
  const trySignIn = () => {
    googleSignIn()
      .then(async (result) => {
        await saveUserInfo(result.user);
      })
      .catch((error) => console.error(error));
  };

  return (
    <button className={className || styles.signInButton} onClick={trySignIn}>
      Continue with Google
    </button>
  );
};

export default SignInButton;
