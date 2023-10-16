import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styles from "./MainContent.module.scss";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { ClockLoader } from "react-spinners";

const Main = () => {
  const isLoading = useAppSelector((state) => state.user.isLoading);

  let content = <Outlet />;

  if (isLoading) {
    content = (
      <ClockLoader
        className={styles.appLoader}
        size={150}
        speedMultiplier={0.5}
      />
    );
  }

  return (
    <div className={styles.appWrapper}>
      <Header />
      <main className={styles.appMainContent}>
        <div className={styles.appContent}>{content}</div>
      </main>
      <Footer />
    </div>
  );
};

export default Main;
