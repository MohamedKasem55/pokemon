import React from "react";
import cn from "classnames";
import styles from "./Spinner.module.css";

function Spinner() {
  return (
    <div className={cn(styles.wrapper)}>
      <div className={cn(styles.spinner)} />
    </div>
  );
}

export default Spinner;
