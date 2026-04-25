import React from "react";
import cn from "classnames";
import styles from "./StatBar.module.css";

const MAX_STAT = 255;

function StatBar({ label, value }: { label: string; value: number }) {
  return (
    <div className={cn(styles.row)}>
      <span className={cn(styles.label)}>{label}</span>
      <div className={cn(styles.track)}>
        <div
          className={cn(styles.fill)}
          style={{ width: `${Math.round((value / MAX_STAT) * 100)}%` }}
        />
      </div>
      <span className={cn(styles.value)}>{value}</span>
    </div>
  );
}

export default StatBar;
