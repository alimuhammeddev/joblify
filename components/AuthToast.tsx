"use client";

import { useEffect, useState } from "react";
import Toast from "@/components/Toast";

const AUTH_TOAST_KEY = "joblify-auth-toast";

export function setAuthToast(message: string) {
  if (typeof window === "undefined") return;

  window.sessionStorage.setItem(AUTH_TOAST_KEY, message);
  window.dispatchEvent(new Event("joblify-auth-toast"));
}

export default function AuthToast() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const readMessage = () => {
      const nextMessage = window.sessionStorage.getItem(AUTH_TOAST_KEY) || "";
      if (nextMessage) {
        window.sessionStorage.removeItem(AUTH_TOAST_KEY);
      }
      setMessage(nextMessage);
    };

    readMessage();
    window.addEventListener("joblify-auth-toast", readMessage);
    return () => window.removeEventListener("joblify-auth-toast", readMessage);
  }, []);

  return <Toast message={message} onClose={() => setMessage("")} />;
}
