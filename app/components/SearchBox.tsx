import React from "react";

type Props = {};

function SearchBox({}: Props) {
  return (
    <div className="">
      <input
        type="text"
        placeholder="Search products..."
        className="pl-10 pr-4 py-2 w-full border border-slate-200 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
      />
    </div>
  );
}

export default SearchBox;
