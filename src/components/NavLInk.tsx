"use client";

import Link from "next/link";
import Image, { StaticImageData } from "next/image";

interface NavLinkProps {
  href: string;
  src: string | StaticImageData;
  width: number;
  height: number;
  alt: string;
  label: string;
}

const NavLink: React.FC<NavLinkProps> = ({
  href,
  src,
  width,
  height,
  alt,
  label,
}) => {
  return (
    <Link
      href={href}
      className="btn btn-ghost border border-orange-200 hover:bg-orange-200 flex items-center"
    >
      <Image src={src} width={width} height={height} alt={alt} />
      <span>{label}</span>
    </Link>
  );
};

export default NavLink;
