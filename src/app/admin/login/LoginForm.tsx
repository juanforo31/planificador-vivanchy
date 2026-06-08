"use client";

import { useActionState } from "react";
import { loginAction } from "../actions";
import styles from "./login.module.css";

const initialState = { error: undefined };

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className={styles.form}>
      <h1 className={styles.title}>Vivanchy Admin</h1>
      <div className={styles.field}>
        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          name="password"
          type="password"
          className="input-field"
          required
          autoFocus
        />
      </div>
      {state?.error && <p className={styles.error}>{state.error}</p>}
      <button type="submit" className="btn btn-primary" disabled={pending} style={{ width: "100%" }}>
        {pending ? "Ingresando..." : "Ingresar"}
      </button>
    </form>
  );
}
