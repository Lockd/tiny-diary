import React from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./Header.module.scss";
import UserInfo from "../../Components/UserInfo/UserInfo";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../Firebase";

const Header = () => {
  const [user] = useAuthState(auth);
  const { year, month } = useParams();
  const headerLink = user === null ? "/" : `/${year}/${month}`;

  return (
    <header className={styles.headerContainer}>
      <Link to={headerLink}>📝 Tiny Diary</Link>
      <UserInfo />
    </header>
  );
};

export default Header;
