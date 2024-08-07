import styles from "../../styles/AdminHeader.module.css";
import { FC, ReactNode } from "react";

interface HeaderProps {
  title: string;
  children?: ReactNode;
}

/**
 * Header component
 * @param title - title of the header
 * @param children - additional elements to be rendered in the header
 * @constructor
 */
const AdminHeader: FC<HeaderProps> = ({ title, children }) => {
  return (
    <header className={styles.header}>
      <h2>{title}</h2>
      <div className={styles.children}>{children}</div>
    </header>
  );
};

export default AdminHeader;
