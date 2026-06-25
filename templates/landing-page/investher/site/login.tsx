"use client";

import { useState } from "react";
import type { FC } from "react";
import Link from "next/link";
import { Crest } from "../ui";
import { C } from "../strive";

const field = "w-full rounded-xl border px-4 py-3 outline-none";

const Login: FC<{ base?: string }> = ({ base = "/demos/strive" }) => {
  const [msg, setMsg] = useState("");
  return (
    <main className="mx-auto flex min-h-[75vh] max-w-md flex-col justify-center px-6 py-16">
      <div className="text-center"><Crest size={56} /></div>
      <h1 className="mt-6 text-center font-serif text-4xl" style={{ color: C.teal }}>Member login</h1>
      <p className="mt-2 text-center text-sm" style={{ opacity: 0.7 }}>Welcome back to the STRIVE community.</p>
      <form className="mt-8 space-y-4" onSubmit={(e) => { e.preventDefault(); setMsg("This is a concept demo — member login isn’t active. Apply to join STRIVE."); }}>
        <input type="email" required placeholder="Email" className={field} style={{ borderColor: C.blue }} />
        <input type="password" required placeholder="Password" className={field} style={{ borderColor: C.blue }} />
        <button type="submit" className="w-full rounded-full px-6 py-3 text-sm font-bold uppercase tracking-[0.15em] text-white" style={{ backgroundColor: C.rasp }}>Log in</button>
      </form>
      {msg && <p className="mt-5 rounded-xl p-4 text-center text-sm" style={{ backgroundColor: C.blue, color: C.teal }}>{msg}</p>}
      <p className="mt-6 text-center text-sm" style={{ color: C.teal }}>Not a member yet? <Link href={`${base}/apply`} className="font-bold underline" style={{ color: C.rasp }}>Apply to STRIVE</Link></p>
    </main>
  );
};

export default Login;
