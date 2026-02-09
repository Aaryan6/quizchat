import React from "react";
import Logo from "@/assets/Images/cy_logo.svg";
import Image from "next/image";
import styles from "./header.module.css";

const Header = () => {
  return (
    // <div className={styles["sticky"]}>
    //   <AppBar position="static" className={styles["app-bar"]}>
    //     <Toolbar>
    //       <div className={` ${styles["navbarContainer"]}`}>
    //         <Image src={Logo} alt="logo" className={styles["logo"]} />
    //       </div>
    //     </Toolbar>
    //   </AppBar>
    // </div>

    <nav className={styles["sticky"]}>
      <div className={styles["app-bar"]}>
        <Image src={Logo} alt="logo" className={styles["logo"]} />
      </div>
    </nav>
  );
};

export default Header;
