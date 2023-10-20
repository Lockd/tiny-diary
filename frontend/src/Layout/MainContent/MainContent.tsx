import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styles from "./MainContent.module.scss";
import { Outlet } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { auth } from "../../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Main = () => {
  const [user, loading] = useAuthState(auth);
  let content = <Outlet />;

  if (loading) {
    content = (
      <div className={styles.appLoaderContainer}>
        <CircularProgress className={styles.appLoader} size={100} />
      </div>
    );
  }

  return (
    <div className={styles.appWrapper}>
      <Header />
      <main className={styles.appMainContent}>{content}</main>
      <Footer />
    </div>
  );
};

export default Main;
