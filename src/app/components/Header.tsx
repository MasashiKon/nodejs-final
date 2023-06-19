import React from "react";
import SingingButton from "./SingingButton";

const Header = () => {
  return (
    <div className="absolute w-screen flex px-5 h-16 items-center border-solid border-2 bg-black drop-shadow-md z-50">
      <div className="text-slate-50">Header</div>
      <SingingButton />
    </div>
  );
};

export default Header;
