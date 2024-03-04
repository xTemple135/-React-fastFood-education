import { useDispatch, useSelector } from "react-redux";
import Headling from "../../components/Heading/Heading";
import { AppDispatch, RootState } from "../../store/store";
import CartItem from "../../components/CartItem/CartItem";
import { useEffect, useState } from "react";
import { Product } from "../../interfaces/productInterface";
import axios from "axios";
import { PREFIX } from "../../Helpers/Api";
import styles from "./Cart.module.scss";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { clear } from "../../store/cart.slice";

const delivery = 169;

function Cart() {
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const items = useSelector((state: RootState) => state.cart.items);
  const jwt = useSelector((state: RootState) => state.user.jwt);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const total = items
    .map((item) => {
      const product = cartProducts.find((p) => p.id === item.id);
      if (!product) {
        return 0;
      }
      return item.count * product.price;
    })
    .reduce((acc, item) => (acc += item), 0);

  const getItem = async (id: number) => {
    const { data } = await axios.get<Product>(`${PREFIX}/products/${id}`);
    return data;
  };
  const loadItems = async () => {
    const result = await Promise.all(items.map((i) => getItem(i.id)));
    setCartProducts(result);
  };

  const buy = async () => {
    await axios.post(
      `${PREFIX}/order/`,
      {
        products: items,
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    dispatch(clear());
    navigate("/success");
  };

  useEffect(() => {
    loadItems();
  }, [items]);
  return (
    <div className={styles['main']}>
      <Headling className={styles["heading"]}>Корзина</Headling>
      {items.map((item) => {
        const product = cartProducts.find((product) => product.id === item.id);
        if (!product) {
          return;
        }
        return <CartItem key={product.id} count={item.count} {...product} />;
      })}
      <div className={styles["line"]}>
        <div className={styles["text"]}>Итог</div>
        <div className={styles["price"]}>
          {total}&nbsp;<span>₽</span>
        </div>
      </div>
      <hr className={styles["hr"]} />
      <div className={styles["line"]}>
        <div className={styles["text"]}>Доставка</div>
        <div className={styles["price"]}>
          {delivery}&nbsp;<span>₽</span>
        </div>
      </div>
      <hr className={styles["hr"]} />
      <div className={styles["line"]}>
        <div className={styles["text"]}>Итог </div>
        <div className={styles["price"]}>
          {total + delivery}&nbsp;<span>₽</span>{" "}
        </div>
      </div>
      <div className={styles["buy"]}>
        <Button appearence="big" onClick={buy} children={"Оформить"} />
      </div>
    </div>
  );
}

export default Cart;
