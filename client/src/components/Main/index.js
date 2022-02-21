import Datatable from "../datatable";
import styles from "./styles.module.css";
import React from "react";

const Main = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>User dashboard</h1>
        <button className={styles.white_btn} onClick={handleLogout}> Logout </button> </nav>
      <Datatable />
    </div>
  );
};

export default Main;