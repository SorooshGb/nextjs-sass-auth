import styles from "@/sass/components/bgSquares.module.scss";

export default function BgSquares() {
  return (
    <div>
      <div className={`${styles.bgSquare} ${styles.square1} `}></div>
      <div className={`${styles.bgSquare} ${styles.square2}`}></div>
      <div className={`${styles.bgSquare} ${styles.square3}`}></div>
    </div>
  );
}
