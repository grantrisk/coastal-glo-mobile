"use client";

import { useState, FC, useEffect } from "react";
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
  navBarDirection?: "horizontal" | "vertical"; // needs displayAsNavBar to be true
  width?: string; // needs displayAsNavBar to be true, sets the width of the vertical nav bar
  switchWidth?: string; // needs displayAsNavBar to be true, sets the width at which the nav bar switches to a drawer
}

/**
 * Drawer component
 * @param routes - array of objects with name and path properties
 * @param position - left or right
 * @param displayAsNavBar - if true, the drawer will be displayed as a nav bar on larger screens
 * @param navBarDirection - horizontal or vertical
 * @param width - width of the vertical nav bar
 * @param switchWidth - width at which the nav bar switches to a drawer
 * @constructor
 */
const Drawer: FC<DrawerProps> = ({
  routes,
  position = "left",
  displayAsNavBar = false,
  navBarDirection = "horizontal",
  width = "190px",
  switchWidth = "768px",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (displayAsNavBar && switchWidth) {
      const styleElement = document.createElement("style");
      styleElement.innerHTML = `
        @media (min-width: ${switchWidth}) {
          .${styles.navBar} {
            display: block;
            width: 100%;
          }
          .${styles.navList} {
            display: flex;
            flex-direction: ${navBarDirection === "horizontal" ? "row" : "column"};
            flex-wrap: nowrap;
            justify-content: space-around;
            list-style-type: none;
            padding: 0;
            margin: 0;
            width: 100%;
          }
          .${styles.alwaysVisible} {
            display: none;
          }
        }
      `;
      document.head.appendChild(styleElement);
      return () => {
        document.head.removeChild(styleElement);
      };
    }
  }, [switchWidth, displayAsNavBar, navBarDirection]);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const drawerClasses = `${styles.drawer} ${isOpen ? styles.open : ""} ${
    position === "right" ? styles.right : ""
  }`;

  const navListClasses = `${styles.navList} ${
    navBarDirection === "horizontal" ? styles.horizontal : ""
  }`;

  // add the width to the navBar class if it is vertical
  const navBarStyles =
    displayAsNavBar && navBarDirection === "vertical" ? { width } : {};

  return (
    <div className={styles.drawerContainer}>
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
        <div className={styles.navBar} style={navBarStyles}>
          <ul className={navListClasses}>
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
