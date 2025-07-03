import { ReactNode } from "react";
import Spinner from "./ui/spinner";
import styles from "@/sass/components/loading-swap.module.scss";

export default function LoadingSwap({
  isLoading,
  children,
  className,
}: {
  isLoading: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={styles.container}>
      <div
        className={`${styles.swapper} ${className}`}
        style={{ visibility: isLoading ? "hidden" : "visible" }}
      >
        {children}
      </div>
      <div
        className={`${styles.swapper} ${className}`}
        style={{ visibility: isLoading ? "visible" : "hidden" }}
      >
        <Spinner />
      </div>
    </div>
  );
}
