import React, { useEffect, useRef } from "react";
import { auth, appSignOut, saveUserInfo } from "../../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import styles from "./UserInfo.module.scss";
import SignInButton from "../SignInButton/SignInButton";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../../app/hooks";
import { clearDiary } from "../../Features/Diary/diarySlice";

const Authentication = () => {
  const [user, loading] = useAuthState(auth);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  const checkIfLoggedIn = () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        await saveUserInfo(user);
      }
    });
  };

  const onLogOut = () => {
    appSignOut()
      .then(() => {
        console.log("[UserInfo]: user signed out");
        dispatch(clearDiary());
        navigate("/");
      })
      .catch((err) => console.error("[UserInfo]: error signing out", err));
  };

  if (loading) return null;

  if (user !== null) {
    return (
      <div className={styles.userInfoContainer} ref={wrapperRef}>
        <button onClick={onLogOut} className={styles.logOutButton}>
          Log out
        </button>
      </div>
    );
  }

  return <SignInButton />;
};

export default Authentication;
