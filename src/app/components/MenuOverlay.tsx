import React from "react";
import NavLink from "./NavLink";

interface MenuOverlayProps {
  links: {
    path: string;
    title: string;
  }[];
  closeMenu: () => void; // Function to close the menu
}

const MenuOverlay: React.FC<MenuOverlayProps> = ({ links, closeMenu }) => {
  return (
    <ul className="flex flex-col py-4 items-center">
      {links.map((link, index) => (
        <li key={index}>
          <NavLink href={link.path} title={link.title} onClick={closeMenu} />
        </li>
      ))}
    </ul>
  );
};

export default MenuOverlay;
