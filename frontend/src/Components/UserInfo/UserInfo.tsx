import React, { useEffect, useState, useRef } from "react";
import { googleSignIn, auth, appSignOut, db } from "../../Firebase";
import { User } from "firebase/auth";
import { addDoc, getDoc, doc, collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import styles from "./UserInfo.module.scss";

const Authentication = () => {
  const [user, loading] = useAuthState(auth);
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
    });
  };

  const onLogIn = () => {
    googleSignIn()
      .then(async (result) => {
        await saveUserInfo(result.user);
      })
      .catch((error) => console.error(error));
  };

  const saveUserInfo = async (user: User) => {
    const { displayName: name, email, uid } = user;
    const userInfo = { name, email, uid };

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
      .then(() => console.log("[UserInfo]: user signed out"))
      .catch((err) => console.error("[UserInfo]: error signing out", err));
  };

  if (loading) return null;

  if (user !== null) {
    return (
      <div
        className={styles.userInfoContainer}
        onClick={() => setIsDropDownOpen(!isDropdownOpen)}
        ref={wrapperRef}
      >
        <div className={styles.userName}>{user?.displayName}</div>
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
