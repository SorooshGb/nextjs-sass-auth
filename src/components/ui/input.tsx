"use client";

import { ComponentProps, ReactNode, useId, useState } from "react";
import styles from "@/sass/components/input.module.scss";

type InputProps = ComponentProps<"input"> & {
  label?: string;
  icon?: ReactNode;
  error?: boolean;
  onValueChange?: (val: string) => string;
};

export default function Input({
  label,
  icon,
  error,
  name,
  className,
  onValueChange,
  ...props
}: InputProps) {
  const [value, setValue] = useState("");
  const id = useId();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;
    const next = onValueChange ? onValueChange(raw) : raw;
    setValue(next);
    props.onChange?.(e);
  }

  return (
    <div className={error ? styles.error : ""}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <div className={styles.container}>
        {icon && icon}
        <input
          id={id}
          name={name}
          className={`${styles.input} ${className}`}
          {...props}
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
