import { useState, useEffect, ChangeEvent } from "react";
import Headling from "../../components/Heading/Heading";
import Search from "../../components/Search/Search";
import style from "./Menu.module.scss";
import cn from "classnames";
import { PREFIX } from "../../Helpers/Api";
import { Product } from "../../interfaces/productInterface";
import axios, { AxiosError } from "axios";
import MenuList from "../../components/MenuList/MenuList";

function Menu() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>();
  const [filter, setFilter] = useState<string>();
  useEffect(() => {
    getMenu(filter);
  }, [filter]);

  const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };
  const getMenu = async (name?: string) => {
    try {
      setIsLoading(true);

      const { data } = await axios.get<Product[]>(`${PREFIX}/products`, {
        params: {
          name,
        },
      });
      setProducts(data);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      if (e instanceof AxiosError) {
        setError(e.message);
      }
      return;
    }
  };

  console.log(products);
  return (
    <>
      <div className={cn(style["head"])}>
        <Headling children={"Меню"} />
        <Search
          placeholder={"Введите блюдо или состав"}
          onChange={updateFilter}
        />
      </div>
      <div>
        {error && <>{error}</>}
        {!isLoading && products.length > 0 && <MenuList products={products} />}
        {isLoading && "Загрузка товаров...."}
        {!isLoading && products.length === 0 && "Ничего не найдено"}
      </div>
    </>
  );
}

export default Menu;
