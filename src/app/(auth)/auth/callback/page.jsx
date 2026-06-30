"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";
import { AuthContext } from "@/context/AuthContext";
import axiosInstance from "@/lib/axios";

export default function AuthCallbackPage() {
  const router = useRouter();
  const { fetchCurrentUser } = useContext(AuthContext);

  useEffect(() => {
    const syncGoogleUser = async () => {
      try {
        const session = await authClient.getSession();

        if (!session?.data?.user) {
          router.replace("/login");
          return;
        }

        const res = await axiosInstance.post("/users/google-sync", {
          name: session.data.user.name,
          email: session.data.user.email,
          image: session.data.user.image,
        });

        localStorage.setItem("accessToken", res.data.data.accessToken);

        await fetchCurrentUser();

        router.replace("/");
      } catch (err) {
        console.error(err);
        router.replace("/login");
      }
    };

    syncGoogleUser();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--background)" }}>
      <div className="text-center">
        <div
          className="w-10 h-10 mx-auto rounded-full border-4 animate-spin"
          style={{ borderColor: "var(--secondary)", borderTopColor: "var(--primary)" }}
        />
        <h2 className="mt-4 text-lg font-semibold" style={{ color: "var(--brand)" }}>
          Signing you in...
        </h2>
      </div>
    </div>
  );
}