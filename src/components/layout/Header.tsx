import Image from "next/image";
import styles from "./Header.module.css";

interface HeaderProps {
  clienteName: string;
}

export default function Header({ clienteName }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <Image src="/logo.jpeg" alt="Vivanchy Logo" width={80} height={80} />
        <div>
          <h1 className={styles.title}>Planificador</h1>
          <p className={styles.subtitle}>Bienvenido, {clienteName}</p>
        </div>
      </div>
    </header>
  );
}
