import Link from "next/link";
import React from "react";

interface NavLinkProps {
  href: string;
  title: string;
  onClick?: () => void; // Optional onClick prop
}

const NavLink: React.FC<NavLinkProps> = ({ href, title, onClick }) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block text-customGray hover:text-hoverGray px-3 py-4"
    >
      {title}
    </Link>
  );
};

export default NavLink;
