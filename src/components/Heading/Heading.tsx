import { HeadlingProps } from "./Heading.props";
import styles from "./Heading.module.scss";
import cn from 'classnames'
function Headling({ children, className, ...props }: HeadlingProps) {
  return (
    <h1 className={cn(styles["h1"], className)} {...props}>
      {children}
    </h1>
  );
}

export default Headling;
