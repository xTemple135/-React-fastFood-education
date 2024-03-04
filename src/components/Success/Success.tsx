import styles from "./Succes.module.scss";
import buySuccess from "../../../public/buyPizza.png";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
function Success() {
  const navigate = useNavigate();
  return (
    <div className={styles['success']}>
      <img src={buySuccess} alt="Заказ оформлен" />
      <div className={styles['text']}>Ваш заказ успешно оформлен</div>
      <Button appearence="big" children={"Сделать новый"} onClick={() => navigate('/')} />
    </div>
  );
}

export default Success;
