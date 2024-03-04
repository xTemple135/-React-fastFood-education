import { ButtonProps } from "./Button.props";
import style from "./Button.module.scss";
import cn from "classnames";

function Button({
  children,
  className,
  appearence = "small",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(style["button"], style["accent"], className, {
        [style["small"]]: appearence == "small",
        [style["big"]]: appearence == "big",
      })}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
