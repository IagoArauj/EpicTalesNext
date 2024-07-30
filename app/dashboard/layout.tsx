"use client";

import { usePathname } from "next/navigation";
import NavMenu from "../components/ui/NavMenu";
import style from "./style.module.css"

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="h-full w-full bg-black-900 flex p-3">
      <NavMenu />
      <div className={`w-full h-full bg-gray-200 rounded-lg px-5 py-3 overflow-x-hidden overflow-y-auto ${style.parchment}`}>
        {children}
      </div>
    </div>
  );
}
