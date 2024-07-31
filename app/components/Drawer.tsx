import { useState, FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "../../styles/Drawer.module.css";

interface Route {
  name: string;
  path: string;
}

interface DrawerProps {
  routes: Route[];
  position?: "left" | "right";
  displayAsNavBar?: boolean;
}

const Drawer: FC<DrawerProps> = ({
  routes,
  position = "left",
  displayAsNavBar = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const drawerClasses = `${styles.drawer} ${isOpen ? styles.open : ""} ${
    position === "right" ? styles.right : ""
  }`;

  return (
    <div className={styles.drawerBackground}>
      {!displayAsNavBar && !isOpen && (
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
                className={`${styles.navLink} ${
                  pathname === route.path ? styles.activeLink : ""
                }`}
                onClick={handleLinkClick}
              >
                {route.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {isOpen && <div className={styles.overlay} onClick={toggleDrawer}></div>}
      {displayAsNavBar && (
        <div className={styles.navBar}>
          <ul className={styles.navList}>
            {routes.map((route, index) => (
              <li key={index} className={styles.navItem}>
                <Link
                  href={route.path}
                  passHref
                  className={`${styles.navLink} ${
                    pathname === route.path ? styles.activeLink : ""
                  }`}
                >
                  {route.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      {displayAsNavBar && (
        <button
          onClick={toggleDrawer}
          className={`${styles.menuButton} ${
            position === "right" ? styles.menuButtonRight : ""
          } ${styles.alwaysVisible}`}
        >
          ☰
        </button>
      )}
    </div>
  );
};

export default Drawer;
