import React, { useEffect, useState, useRef } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { googleSignIn, auth, appSignOut, db } from "../../Firebase";
import { User } from "firebase/auth";
import { addDoc, getDoc, doc, collection } from "firebase/firestore";
import {
  setUserInfo,
  clearUserData,
  setIsLoading,
} from "../../Features/User/userSlice";

import styles from "./UserInfo.module.scss";

const Authentication = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const userName = useAppSelector((state) => state.user.name);
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
        await saveUserInfo(user);
      }
      dispatch(setIsLoading(false));
    });
  };

  const onLogIn = () => {
    googleSignIn()
      .then(async (result) => {
        saveUserInfo(result.user);
      })
      .catch((error) => console.error(error));
  };

  const saveUserInfo = async (user: User) => {
    const { displayName: name, email, uid } = user;
    const userInfo = { name, email, uid };

    dispatch(setUserInfo(userInfo));

    try {
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        await addDoc(collection(db, "users"), userInfo);
      } else {
        console.log("[UserInfo]: User was already present");
      }
    } catch (e) {
      console.error("[UserInfo]: error occurred during user creation", e);
    }
  };

  const onLogOut = () => {
    appSignOut()
      .then(() => {
        dispatch(clearUserData());
      })
      .catch((err) => console.error("[UserInfo]: error signing out", err));
  };

  if (isLoggedIn) {
    return (
      <div
        className={styles.userInfoContainer}
        onClick={() => setIsDropDownOpen(!isDropdownOpen)}
        ref={wrapperRef}
      >
        <div className={styles.userName}>{userName}</div>
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
