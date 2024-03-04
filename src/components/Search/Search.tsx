import { forwardRef } from "react";
import styles from "./Search.module.scss";
import cn from "classnames";
import { SearchProps } from "./Search.props";
import findIcon from "../../../public/find-icon.svg";
const Search = forwardRef<HTMLInputElement, SearchProps>(function Search(
  { isValid = true, className, ...props },
  ref
) {
  return (
    <div className={cn(styles["search-wrapper"])}>
      <input
        ref={ref}
        className={cn(styles["search-input"], className)}
        {...props}
      />
      <img className={cn(styles["findIcon"])} src={findIcon} />
    </div>
  );
});

export default Search;
