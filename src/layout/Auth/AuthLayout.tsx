import { Outlet } from "react-router-dom";
import logoSite from "../../../public/logoAuth.png";
import styles from "./Auth.module.scss"

function AuthLayout() {
  return (
      <div className={styles["layout"]}>
       <div className={styles["leftBar"]} >
          <img src={logoSite} alt="Логотип" />
        </div>
        <div className={styles["content"]}>
          <Outlet />
        </div>
      </div>
  );
}

export default AuthLayout;
