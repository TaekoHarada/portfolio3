"use client";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useState } from "react";
import NavLink from "./NavLink";
import MenuOverlay from "./MenuOverlay";

// Menu items
const menuItems = [
  { path: "#Hero.", title: "Home." },
  { path: "#Projects.", title: "Projects." },
  { path: "#About.", title: "About." },
  { path: "#TechNews.", title: "Tech News." },
  { path: "#Contact.", title: "Contact." },
];

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-white bg-opacity-90 border border-t-1 border-gray-300">
      <div className="flex flex-wrap items-center justify-between mx-auto px-5 py-2">
        <Link href="#Hero.">
          <div className="text-gray-800 hover:text-blue-500">
            <span className="text-lg font-semibold">Taeko Harada</span>
            <span className="ml-3 italic">
              Software Developer, IT Administrator
            </span>
          </div>
        </Link>

        {/* For mobile */}
        <div className="mobile-menu block md:hidden">
          {menuOpen ? (
            <button
              onClick={() => setMenuOpen(false)}
              className="flex items-center p-3 border rounded border-slate-700 text-slate-800 hover:text-[#808080] hover:border-[#808080]"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          ) : (
            <button
              onClick={() => setMenuOpen(true)}
              className="flex items-center p-3 border rounded border-slate-700 text-slate-800 hover:text-hoverGray hover:border-hoverGray"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          )}
        </div>

        {/* For larger screen */}
        <div className="menu hidden md:block md:w-auto" id="navbar">
          <ul className="flex flex-row">
            {menuItems.map((item, index) => (
              <li key={index}>
                <NavLink href={item.path} title={item.title} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Pass setMenuOpen(false) to MenuOverlay to close the menu when a link is clicked */}
      {menuOpen ? (
        <MenuOverlay links={menuItems} closeMenu={() => setMenuOpen(false)} />
      ) : null}
    </nav>
  );
};

export default Navbar;
