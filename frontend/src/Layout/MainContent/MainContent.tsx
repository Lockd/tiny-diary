import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styles from "./MainContent.module.scss";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div className={styles.appWrapper}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Main;
