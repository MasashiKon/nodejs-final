"use client"

import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const SingingButton = () => {
  const { data: session } = useSession();

  return session && session.user ? (
    <div className="flex gap-4 ml-auto">
      <p className="text-slate-50-">{session.user.email}</p>
      <button onClick={() => signOut()} className="text-slate-50">
        Sign Out
      </button>
    </div>
  ) : (
    <button onClick={() => signIn()} className="text-slate-50 ml-auto">Sing In</button>
  );
};

export default SingingButton;
