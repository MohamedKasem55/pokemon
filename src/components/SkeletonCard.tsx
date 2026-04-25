import React from "react";
import cn from "classnames";
import styles from "./SkeletonCard.module.css";

function SkeletonCard() {
  return (
    <div className={cn(styles.card)}>
      <div className={cn(styles.image)} />
      <div className={cn(styles.name)} />
      <div className={cn(styles.id)} />
    </div>
  );
}

export default SkeletonCard;
