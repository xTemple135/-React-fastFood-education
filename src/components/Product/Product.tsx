import { Await, Link, useLoaderData } from "react-router-dom";
import { Product as ProductType } from "../../interfaces/productInterface";
import { Suspense } from "react";
import Headling from "../Heading/Heading";
import style from "./Product.module.scss";
import starIcon from "../../../public/star.svg";
import Button from "../Button/Button";

function Product() {
  const data = useLoaderData() as { data: ProductType };
  console.log(data);
  return (
    <div className={style["info"]}>
      <Suspense fallback={"Загружаю...."}>
        <Await resolve={data.data}>
          {({ data }: { data: ProductType }) => (
            <div className={style["wrapper"]}>
              <Headling children={data.name} />
              <div className={style["cart-info"]}>
                <div className={style["leftBar"]}>
                  <img
                    className={style["pic"]}
                    src={data.image}
                    alt="Картинка товара"
                  />
                </div>
                <div className={style["rightBar"]}>
                  <div className={style["line"]}>
                    <div className={style["text"]}>Цена</div>
                    <div className={style["price"]}>
                      {data.price}&nbsp;<span>₽</span>
                    </div>
                  </div>
                  <hr className={style["hr"]} />
                  <div className={style["line"]}>
                    <div className={style["text"]}>Рейтинг</div>
                    <div className={style["raiting"]}>
                      {data.rating}&nbsp;
                      <span>
                        <img
                          className={style["starIcon"]}
                          src={starIcon}
                          alt=""
                        />
                      </span>
                    </div>
                  </div>
                  <div className={style["composition"]}>Состав</div>
                  <div className={style["List"]}>
                    <ul className={style["main-list"]}>
                      {data.ingredients.map((item) => (
                        <li className={style["main-list__item"]}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div>
                <Link to="/">
                  <Button children="Назад" appearence="small" />
                </Link>
              </div>
            </div>
          )}
        </Await>
      </Suspense>
    </div>
  );
}

export default Product;
