import { forwardRef } from "react";
import cn from "classnames";
import style from "./Input.module.scss";
import { InputProps } from "./Input.props";
const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { isValid = true, className, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      className={cn(style["input"], className, {
        [style["isValid"]]: isValid,
      })}
      {...props}
    />
  );
});

export default Input;
