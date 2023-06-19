import React from "react";
import Link from "next/link";

const page = () => {
  return (
    <div className="h-screen bg-slate-200 grid place-content-center">
      <button className="rounded-md bg-black p-5"><Link href="/test"><p className="text-slate-50">Let's test your chinese knowledge!</p></Link></button>
    </div>
  );
};

export default page;
