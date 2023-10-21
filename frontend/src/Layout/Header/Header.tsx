import React from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./Header.module.scss";
import UserInfo from "../../Components/UserInfo/UserInfo";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../Firebase";
import { Typography } from "@mui/material";

const Header = () => {
  const [user] = useAuthState(auth);
  const { year, month } = useParams();
  const headerLink = user === null ? "/" : `/${year}/${month}`;

  return (
    <header className={styles.headerContainer}>
      <Link to={headerLink} className={styles.headerTitle}>
        Tiny Diary
      </Link>
      <UserInfo />
    </header>
  );
};

export default Header;
