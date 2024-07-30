import { useState, FC } from "react";
import Link from "next/link";
import styles from "../../styles/Drawer.module.css";

interface Route {
  name: string;
  path: string;
}

interface DrawerProps {
  routes: Route[];
}

const Drawer: FC<DrawerProps> = ({ routes }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <div>
      {!isOpen && (
        <button onClick={toggleDrawer} className={styles.menuButton}>
          ☰
        </button>
      )}
      <div className={`${styles.drawer} ${isOpen ? styles.open : ""}`}>
        <button onClick={toggleDrawer} className={styles.closeButton}>
          &times;
        </button>
        <ul className={styles.navList}>
          {routes.map((route, index) => (
            <li key={index} className={styles.navItem}>
              <Link
                href={route.path}
                passHref
                className={styles.navLink}
                onClick={handleLinkClick}
              >
                {route.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div
        className={isOpen ? styles.overlay : ""}
        onClick={toggleDrawer}
      ></div>
    </div>
  );
};

export default Drawer;
