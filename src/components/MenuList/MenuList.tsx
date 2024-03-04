import { MenuList } from "./MenuList.props";
import ProudctCard from "../productCard/ProudctCard";
import styles from './MenuList.module.scss'

export default function MenuList({ products }: MenuList) {
  return (
    <div className={styles['menu']}>
      {products.map((item) => (
        <ProudctCard
          key={item.id}
          id={item.id}
          title={item.name}
          description={item.ingredients.join(", ")}
          rating={item.rating}
          price={item.price}
          image={item.image}
        />
      ))}
      ;
    </div>
  );
}
