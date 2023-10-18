import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styles from "./MainContent.module.scss";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { CircularProgress } from "@mui/material";

const Main = () => {
  const isLoading = useAppSelector((state) => state.user.isLoading);

  let content = <Outlet />;

  if (isLoading) {
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
