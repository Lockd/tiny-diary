import React from "react";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      This project is open-sourced, you can&nbsp;
      <a
        className={styles.footerLink}
        href="https://github.com/Lockd/tiny-diary"
      >
        contribute
      </a>
    </footer>
  );
};

export default Footer;
