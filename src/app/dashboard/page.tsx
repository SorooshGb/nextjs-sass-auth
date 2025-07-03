"use client";

import Button from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { logout, user, isAuthenticated, loading, protect } = useAuth();
  const router = useRouter();

  useEffect(() => {
    protect();
  }, [protect]);

  function handleLogout() {
    logout();
    router.push("/auth");
  }

  if (loading || !isAuthenticated) return null;

  return (
    <div>
      <h1 style={{ margin: 16 }}>
        Welcome to dashboard{" "}
        <span style={{ color: "var(--clr-cyan-500)" }}>
          {user?.results[0].name.first} {user?.results[0].name.last}
        </span>
      </h1>
      <Button
        onClick={handleLogout}
        style={{
          padding: 10,
          border: "1px solid black",
          margin: 16,
          borderRadius: 5,
        }}
      >
        Logout
      </Button>
    </div>
  );
}
