"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./style.module.css";

const links = [
  {
    href: "/",
    label: "Curated",
  },
  {
    href: "/seek",
    label: "Seek",
  },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className={`has-divider-after ${styles.container}`}>
      {links.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link
            className={isActive ? "active" : ""}
            href={link.href}
            key={link.label}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
