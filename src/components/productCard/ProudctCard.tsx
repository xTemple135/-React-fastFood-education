import {MouseEvent} from 'react'
import { ProductCardProps } from "./ProductCard.props";
import styles from "./Product.module.scss";
import bagIcon from "../../../public/bag.svg";
import starIcon from "../../../public/star.svg";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { addToCart } from "../../store/cart.slice";

function ProudctCard({
  id,
  title,
  price,
  rating,
  image,
  description,
}: ProductCardProps) {

  const dispatch = useDispatch<AppDispatch>()
  const add = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(addToCart(id))
    
  };
  return (
    <Link to={`/product/${id}`} className={styles["link"]}>
      <div className={styles["card"]}>
        <div
          className={styles["head"]}
          style={{ backgroundImage: `url('${image}')` }}
        >
          <div className={styles["price"]}>
            {price}&nbsp; <span className={styles["currency"]}>₽</span>
          </div>
          <button className={styles["addCard"]} onClick={add}>
            <img src={bagIcon} alt="" />
          </button>
          <div className={styles["rating"]}>
            {rating}
            <img src={starIcon} alt="" />
          </div>
        </div>
        <div className={styles["footer"]}>
          <div className={styles["title"]}>{title}</div>
          <div className={styles["description"]}>{description}</div>
        </div>
      </div>
    </Link>
  );
}

export default ProudctCard;


