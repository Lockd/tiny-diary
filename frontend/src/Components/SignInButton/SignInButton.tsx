import React from "react";
import styles from "./SignInButton.module.scss";
import { Button } from "@mui/material";
import { googleSignIn, saveUserInfo } from "../../Firebase";

const SignInButton = () => {
  const trySignIn = () => {
    googleSignIn()
      .then(async (result) => {
        await saveUserInfo(result.user);
      })
      .catch((error) => console.error(error));
  };

  return (
    <Button className={styles.googleSignInBtn} onClick={trySignIn}>
      Sign In with Google
    </Button>
  );
};

export default SignInButton;
