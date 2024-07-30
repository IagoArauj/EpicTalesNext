"use client";

import {
  BookOpenIcon,
  CogIcon,
  DocumentTextIcon,
  MagnifyingGlassIcon,
  RectangleGroupIcon,
} from "@heroicons/react/20/solid";

import { playfair } from "../fonts";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBoxes, faBoxesAlt, faDragon, faDungeon, faHatWizard, faMagic, faMagnifyingGlass, faPaw, faScroll } from "@fortawesome/free-solid-svg-icons";

export default function NavMenu() {
  const pathname = usePathname();

  const routes = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: faDungeon,
    },
    {
      name: "My Campaigns",
      href: "/dashboard/campaigns",
      icon: faScroll,
    },
    {
      name: "Bestiary",
      href: "/dashboard/bestiary",
      icon: faPaw,
    },
    {
      name: "Search Items",
      href: "/dashboard/items",
      icon: faBoxesAlt,
    },
    {
      name: "Search Spells",
      href: "/dashboard/spells",
      icon: faHatWizard,
    }
  ];

  return (
    <aside className="w-1/5 h-full py-3">
      <nav className="flex flex-col h-full">
        <h1
          className={`text-3xl text-white mb-5 text-center select-none ${playfair.className}`}
        >
          EpicTales
        </h1>
        {routes.map((route, idx) => {
          console.log(route.href, pathname, route.href.startsWith(pathname));
          return (
            <a
              key={idx}
              href={route.href}
              className={`flex h-[48px] items-center justify-left gap-2 rounded-l-md my-2 ${
                pathname === route.href || (pathname.startsWith(route.href) && route.href !== "/dashboard")
                  ? "bg-slate-100 hover:bg-slate-300"
                  : "text-white hover:bg-slate-600 hover:text-white"
              } p-3 text-sm  transition`}
            >
              <FontAwesomeIcon icon={route.icon} />
              {route.name}
            </a>
          );
        })}
        <a
          href="/dashboard/settings"
          className={`flex h-[48px] items-center justify-left gap-2 rounded-l-md mt-auto ${
            pathname.startsWith("/dashboard/settings")
              ? "bg-slate-100"
              : "text-white hover:bg-slate-600 hover:text-white"
          } p-3 text-sm  transition`}
        >
          <CogIcon className="w-5" />
          Settings
        </a>
      </nav>
    </aside>
  );
}
