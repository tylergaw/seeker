import Link from "next/link";
import styles from "./style.module.css";

const links = [
  {
    href: "/",
    label: "Seeker",
  },
  // TODO: Add search route when it's ready
];

export default function Nav() {
  return (
    <nav className={`has-divider-after ${styles.container}`}>
      {links.map((link) => {
        return (
          <Link href={link.href} key={link.label}>
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
