import { Outlet, NavLink, useNavigate } from "react-router-dom";
import styles from "./Layout.module.scss";
import menuIcon from "../../../public/menu.svg";
import cartIcon from "../../../public/cart.svg";
import userIcon from "../../../public/Anarchy.png";
import Button from "../../components/Button/Button";
import exitIcon from "../../../public/exit-icon.svg";
import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, logOut } from "../../store/user.slice";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";

function Layout() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((state: RootState) => state.user.profile);
  const items = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const handClickExit = () => {
    dispatch(logOut());
    navigate("/auth/login");
  };
  return (
    <div className={styles["layout"]}>
      <div className={styles["leftbar"]}>
        <div className={styles["user"]}>
          <img className={styles["avatar"]} src={userIcon} alt="" />
          <div className={styles["name"]}>{profile?.name}</div>
          <div className={styles["email"]}>{profile?.email}</div>
        </div>
        <div className={styles["menu"]}>
          <NavLink
            className={({ isActive }) =>
              cn(styles["link"], {
                [styles.active]: isActive,
              })
            }
            to={"/cart"}
          >
            <img src={menuIcon} />
            Корзина
           <span className={styles['cartItem']}> {items.reduce((acc, item) => {
            return (acc += item.count); 
          }, 0)} </span>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              cn(styles["link"], {
                [styles.active]: isActive,
              })
            }
            to={"/"}
          >
            <img src={cartIcon} />
            Меню
          </NavLink>
        </div>
        <Button
          className={styles["exit"]}
          appearence="small"
          onClick={handClickExit}
        >
          <img src={exitIcon} />
          Выйти
        </Button>
      </div>
      <div className={cn(styles["content"])}>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
