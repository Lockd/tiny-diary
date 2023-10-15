import React, { useEffect, useState, useRef } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { googleSignIn, auth, appSignOut } from "../../Firebase";
import { User } from "firebase/auth";
import { setUserInfo, clearUserData } from "../../Features/User/userSlice";

import styles from "./UserInfo.module.scss";

const Authentication = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const userName = useAppSelector((state) => state.user.name);
  const profilePicture = useAppSelector((state) => state.user.profilePicture);
  const [isDropdownOpen, setIsDropDownOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsDropDownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  const checkIfLoggedIn = () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        saveUserInfo(user, token);
      }
    });
  };

  const onLogIn = () => {
    googleSignIn()
      .then(async (result) => {
        const token = await result.user.getIdToken();

        saveUserInfo(result.user, token);
      })
      .catch((error) => console.error(error));
  };

  const saveUserInfo = (user: User, token?: string) => {
    const { displayName: name, email, photoURL: profilePicture } = user;

    dispatch(setUserInfo({ name, email, token, profilePicture }));
  };

  const onLogOut = () => {
    appSignOut()
      .then(() => {
        dispatch(clearUserData());
      })
      .catch((err) => console.error("error signing out", err));
  };

  if (isLoggedIn) {
    return (
      <div
        className={styles.userInfoContainer}
        onClick={() => setIsDropDownOpen(!isDropdownOpen)}
        ref={wrapperRef}
      >
        <div className={styles.userName}>{userName}</div>
        <div className={styles.userAvatarContainer}>
          {profilePicture && (
            <img
              src={profilePicture}
              alt="avatar picture"
              className={styles.userAvatar}
            />
          )}
        </div>
        {isDropdownOpen && (
          <div className={styles.dropdown}>
            <p className={styles.dropdownText}>
              Your log in information is used to sync data across multiple
              devices. If you log off newly added texts are not going to be
              accessible from other devices
            </p>
            <button onClick={onLogOut} className={styles.logOutButton}>
              Log out
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <button className={styles.googleSignInBtn} onClick={onLogIn}>
      Sign In with Google
    </button>
  );
};

export default Authentication;
