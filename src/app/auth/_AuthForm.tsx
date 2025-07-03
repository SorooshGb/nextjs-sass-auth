"use client";

import MobileInput from "@/components/MobileInput";
import styles from "@/sass/components/auth-form.module.scss";
import Button from "@/components/ui/button";
import LoadingSwap from "@/components/LoadingSwap";
import { useState, useTransition } from "react";
import { loginUser } from "../actions/loginAction";
import Image from "next/image";
import { loginSchema } from "../actions/schemas";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function AuthForm() {
  const [isLoading, startTransition] = useTransition();
  const [error, setError] = useState({ general: "", mobile: "" });
  const router = useRouter();
  const { login } = useAuth();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError({ general: "", mobile: "" });

    const formData = new FormData(e.currentTarget);

    const parsed = loginSchema.safeParse(Object.fromEntries(formData));

    if (!parsed.success) {
      const mobileError = parsed.error.flatten().fieldErrors.mobile?.[0];
      if (mobileError) setError((prev) => ({ ...prev, mobile: mobileError }));
      return;
    }

    startTransition(async () => {
      const res = await loginUser(parsed.data);

      if (res.error) {
        setError((prev) => ({ ...prev, general: res.message }));
        return;
      }

      login(res.data);
      router.push("/dashboard");
    });
  }

  return (
    <div className={styles.loginContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Image
          width={640}
          height={640}
          className={styles.blankUser}
          src="/blank-profile.png"
          alt="default-user-img"
        />
        <div className={styles.formHeader}>
          <h1>Login</h1>
          <p aria-live="polite">{error.general && error.general}</p>
        </div>
        <MobileInput error={error.mobile} />
        <Button type="submit" className={styles.submitBtn} disabled={isLoading}>
          <LoadingSwap isLoading={isLoading}>Login</LoadingSwap>
        </Button>
      </form>
    </div>
  );
}
