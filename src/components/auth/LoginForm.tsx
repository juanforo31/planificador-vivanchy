"use client";

import Image from "next/image";
import { useLoginForm } from "@/hooks/useLoginForm";
import styles from "./LoginForm.module.css";

export default function LoginForm() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    isSubmitting,
    isLoading,
    user,
    handleSubmit
  } = useLoginForm();

  if (isLoading || user) return null;

  return (
    <div className={styles.container}>
      <div className={`glass-panel ${styles.panel}`}>
        <div className={styles.header}>
          <Image
            src="/logo.jpeg"
            alt="Vivanchy Logo"
            width={120}
            height={120}
            className={styles.logo}
          />
          <h1 className={styles.title}>Planificador</h1>
          <p className={styles.subtitle}>Inicia sesión para continuar</p>
        </div>

        {error && (
          <div className={styles.error}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div>
            <label className={styles.label}>
              Correo electrónico
            </label>
            <input
              type="email"
              className="input-field"
              placeholder="ej. admin@test.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className={styles.label}>
              Contraseña
            </label>
            <input
              type="password"
              className="input-field"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className={`btn btn-primary ${styles.submitBtn}`}
            style={{ opacity: isSubmitting ? 0.7 : 1 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Iniciando..." : "Ingresar"}
          </button>
        </form>

        <div className={styles.testUsers}>
          <p>Usuarios de prueba:</p>
          <p>admin@test.com / password</p>
          <p>usuario@test.com / password</p>
        </div>
      </div>
    </div>
  );
}
