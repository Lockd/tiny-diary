import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import UserInfo from "../../Components/UserInfo/UserInfo";

const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <Link to="/">📝 Tiny Diary</Link>
      <UserInfo />
    </header>
  );
};

export default Header;
