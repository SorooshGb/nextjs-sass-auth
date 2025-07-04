"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const { isAuthenticated, loading, protect } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) router.push("/dashboard");
      else protect();
    }
  }, [isAuthenticated, loading, protect, router]);

  return <h1 style={{ margin: 16 }}>Loading...</h1>;
}
