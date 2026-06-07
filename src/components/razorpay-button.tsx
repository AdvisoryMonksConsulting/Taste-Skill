"use client";
import { useEffect, useRef } from "react";

/**
 * Razorpay Payment Button. Renders once you set a real button id in src/lib/site.ts
 * (Razorpay Dashboard → Payment Button → copy `pl_xxx`). Until then it stays empty,
 * so the page also shows fallback payment options.
 */
export function RazorpayButton({ buttonId }: { buttonId: string }) {
  const ref = useRef<HTMLFormElement>(null);
  useEffect(() => {
    const form = ref.current;
    if (!form || !buttonId || buttonId.includes("REPLACE") || form.querySelector("script")) return;
    const s = document.createElement("script");
    s.src = "https://cdn.razorpay.com/static/widget/payment-button.js";
    s.async = true;
    s.dataset.payment_button_id = buttonId;
    form.appendChild(s);
  }, [buttonId]);
  return <form ref={ref} />;
}
