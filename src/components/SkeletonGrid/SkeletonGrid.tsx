import React from "react";
import cn from "classnames";
import SkeletonCard from "../SkeletonCard/SkeletonCard";
import styles from "./SkeletonGrid.module.css";

const PAGE_SIZE = 20;

function SkeletonGrid() {
  return (
    <div className={cn(styles.wrapper)}>
      <div className={cn(styles.grid)}>
        {Array.from({ length: PAGE_SIZE }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}

export default SkeletonGrid;
