import styles from "./CartItem.module.scss";

import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { addToCart, del, remove } from "../../store/cart.slice";
import { CartItemProps } from "./CartItem.props";
import incrIcon from "../../../public/incr.svg";
import descrIcon from "../../../public/descr.svg";
import closeSvg from "../../../public/closeSvg.svg";

function CartItem({ id, price, name, image, count }: CartItemProps) {
  const dispatch = useDispatch<AppDispatch>();
  const decrease = () => {
    dispatch(remove(id));
  };

  const increase = () => {
    dispatch(addToCart(id));
  };

  const deleteItem = () => {
    dispatch(del(id));
  };
  return (
    <div className={styles["head"]}>
      <div
        className={styles["image"]}
        style={{ backgroundImage: `url('${image}')` }}
      ></div>
      <div className={styles["description"]}>
        <div className={styles["name"]}>{name}</div>
        <div className={styles["currency"]}>{price}&nbsp;₽</div>
      </div>
      <div className={styles["actions"]}>
        <button className={styles["minus"]} onClick={decrease}>
          <img src={descrIcon} alt="Удалить" />
        </button>
        <div className={styles["number"]}>{count}</div>
        <button className={styles["plus"]} onClick={increase}>
          <img src={incrIcon} alt="Добавить" />
        </button>
        <button className={styles["close"]} onClick={deleteItem}>
          <img src={closeSvg} alt="Очистить" />
        </button>
      </div>
    </div>
  );
}

export default CartItem;
