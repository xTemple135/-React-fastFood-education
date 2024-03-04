import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Headling from "../../components/Heading/Heading";
import Input from "../../components/Input/Input";
import styles from "./Register.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { FormEvent, useEffect } from "react";
import { clearRegister, register } from "../../store/user.slice";

export type RegisterForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
  name: {
    value: string;
  };
};

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const jwt = useSelector((state: RootState) => state.user.jwt);
  const registerError = useSelector(
    (state: RootState) => state.user.registerErrorMessage
  );
  useEffect(() => {
    if (jwt) {
      navigate("/");
    }
  }, [jwt, navigate]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(clearRegister());
    const target = e.target as typeof e.target & RegisterForm;
    const { email, password, name } = target;
    dispatch(
      register({
        email: email.value,
        password: password.value,
        name: name.value,
      })
    );
  };
  return (
    <div className={styles["logForm"]}>
      <Headling>Вход</Headling>
      {registerError && <div className={styles["error"]}>{registerError}</div>}
      <form action="" className={styles["form"]} onSubmit={submit}>
        <div className={styles["field"]}>
          <label htmlFor="email">Ваш e-mail</label>
          <Input id="email" placeholder="Email" name="email"></Input>
        </div>
        <div className={styles["field"]}>
          <label htmlFor="password">Ваш пароль</label>
          <Input
            id="password"
            placeholder="Пароль"
            type="password"
            name="password"
          ></Input>
        </div>
        <div className={styles["field"]}>
          <label htmlFor="name">Ваше имя</label>
          <Input id="name" placeholder="Имя" name="name"></Input>
        </div>
        <Button children={"Зарегестрироваться"} appearence="big" />
        <div className={styles["reg"]}>
          <div className={styles["reg_not"]}>Есть акканут?</div>
          <Link className={styles["Link"]} to={"/auth/register"}>
            Войти
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
