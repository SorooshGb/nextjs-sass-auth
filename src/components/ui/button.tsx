import { ComponentProps } from "react";

export default function Button({
  type,
  className,
  children,
  ...props
}: ComponentProps<"button">) {
  return (
    <button type={type} className={className} {...props}>
      {children}
    </button>
  );
}
