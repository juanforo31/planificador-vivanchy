"use client";

import { useActionState } from "react";
import Link from "next/link";
import { crearClienteAction } from "../../actions";
import styles from "../../form.module.css";

const initialState: { error?: string } = {};

export function NuevoClienteForm() {
  const [state, formAction, pending] = useActionState(crearClienteAction, initialState);

  return (
    <form action={formAction} className={styles.form}>
      <div className={styles.formHeader}>
        <Link href="/admin" className={styles.back}>← Volver</Link>
        <h1 className={styles.title}>Nuevo cliente</h1>
      </div>

      <div className={styles.grid}>
        <div className={styles.field}>
          <label htmlFor="nombre">Nombre completo *</label>
          <input id="nombre" name="nombre" className="input-field" required />
        </div>
        <div className={styles.field}>
          <label htmlFor="telefono">Teléfono</label>
          <input id="telefono" name="telefono" type="tel" className="input-field" />
        </div>
        <div className={styles.field}>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" className="input-field" />
        </div>
        <div className={styles.field}>
          <label htmlFor="fechaNacimiento">Fecha de nacimiento</label>
          <input id="fechaNacimiento" name="fechaNacimiento" type="date" className="input-field" />
        </div>
        <div className={`${styles.field} ${styles.fullWidth}`}>
          <label htmlFor="direccion">Dirección</label>
          <input id="direccion" name="direccion" className="input-field" />
        </div>
        <div className={styles.field}>
          <label htmlFor="contactoFamiliar">Contacto familiar</label>
          <input id="contactoFamiliar" name="contactoFamiliar" className="input-field" />
        </div>
        <div className={styles.field}>
          <label htmlFor="telefonoFamiliar">Teléfono familiar</label>
          <input id="telefonoFamiliar" name="telefonoFamiliar" type="tel" className="input-field" />
        </div>
        <div className={`${styles.field} ${styles.fullWidth}`}>
          <label htmlFor="notas">Notas</label>
          <textarea id="notas" name="notas" className="input-field" rows={3} />
        </div>
      </div>

      {state?.error && <p className={styles.error}>{state.error}</p>}

      <button type="submit" className="btn btn-primary" disabled={pending} style={{ alignSelf: "flex-start" }}>
        {pending ? "Guardando..." : "Crear cliente"}
      </button>
    </form>
  );
}
