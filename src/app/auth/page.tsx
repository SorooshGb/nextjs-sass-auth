"use client";

import BgSquares from "@/components/BgSquares";
import AuthForm from "./_AuthForm";
import styles from "@/sass/pages/auth.module.scss";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthPage() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push("/dashboard");
    }
  }, [loading, isAuthenticated, router]);

  if (loading || isAuthenticated) return null;

  return (
    <div className={styles.loginPageBody}>
      <BgSquares />
      <AuthForm />
    </div>
  );
}
