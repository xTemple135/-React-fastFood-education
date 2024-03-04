import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Headling from "../../components/Heading/Heading";
import Input from "../../components/Input/Input";
import styles from "./Login.module.scss";
import { FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { clearLogin, login } from "../../store/user.slice";

export type LoginForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
};

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const jwt = useSelector((state: RootState) => state.user.jwt);
  const loginError = useSelector(
    (state: RootState) => state.user.loginErrorMessage
  );
  useEffect(() => {
    if (jwt) {
      navigate("/");
    }
  }, [jwt, navigate]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(clearLogin());
    const target = e.target as typeof e.target & LoginForm;
    const { email, password } = target;
    await sendLogin(email.value, password.value);
  };

  const sendLogin = async (email: string, password: string) => {
    dispatch(login({ email, password }));
  };
  return (
    <div className={styles["logForm"]}>
      <Headling>Вход</Headling>
      {loginError && <div className={styles["error"]}>{loginError}</div>}
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
        <Button children={"Вход"} appearence="big" />
        <div className={styles["reg"]}>
          <div className={styles["reg_not"]}>Нет аккаунта?</div>
          <Link className={styles["Link"]} to={"/auth/register"}>
            Зарегестрироваться{" "}
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
