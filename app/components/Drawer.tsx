import { useState, FC } from "react";
import Link from "next/link";
import styles from "../../styles/Drawer.module.css";

interface Route {
  name: string;
  path: string;
}

interface DrawerProps {
  routes: Route[];
  position?: "left" | "right";
}

const Drawer: FC<DrawerProps> = ({ routes, position = "left" }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const drawerClasses = `${styles.drawer} ${
    isOpen ? styles.open : ""
  } ${position === "right" ? styles.right : ""}`;

  return (
    <div>
      {!isOpen && (
        <button
          onClick={toggleDrawer}
          className={`${styles.menuButton} ${
            position === "right" ? styles.menuButtonRight : ""
          }`}
        >
          ☰
        </button>
      )}
      <div className={drawerClasses}>
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
      {isOpen && <div className={styles.overlay} onClick={toggleDrawer}></div>}
    </div>
  );
};

export default Drawer;
