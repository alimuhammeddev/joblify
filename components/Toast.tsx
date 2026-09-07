"use client";

import { CheckCircle, X } from "lucide-react";
import { useEffect } from "react";

export default function Toast({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!message) return;

    const timeout = window.setTimeout(onClose, 1500);
    return () => window.clearTimeout(timeout);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed right-4 top-20 z-50 flex max-w-sm items-center gap-3 rounded-xl bg-[#1F3064] px-4 py-3 text-sm text-white shadow-lg">
      <CheckCircle size={18} className="shrink-0 text-[#F0802D]" />
      <span>{message}</span>
      <button type="button" onClick={onClose} aria-label="Close notification">
        <X size={16} />
      </button>
    </div>
  );
}
