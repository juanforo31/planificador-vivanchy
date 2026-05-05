"use client";

import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import styles from "./Header.module.css";

export default function Header() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <Image src="/logo.jpeg" alt="Vivanchy Logo" width={80} height={80} />
        <div>
          <h1 className={styles.title}>Planificador</h1>
          <p className={styles.subtitle}>Bienvenido, {user.name}</p>
        </div>
      </div>
      <button onClick={logout} className={`btn ${styles.logoutBtn}`}>
        Cerrar Sesión
      </button>
    </header>
  );
}
