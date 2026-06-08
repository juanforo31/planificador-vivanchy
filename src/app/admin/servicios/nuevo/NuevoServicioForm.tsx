"use client";

import { useActionState } from "react";
import Link from "next/link";
import { crearServicioAction } from "../../actions";
import styles from "../../form.module.css";

const TIPOS_SERVICIO = ["Consulta médica", "Transporte", "Acompañamiento", "Cuidado en casa", "Terapia", "Otro"];
const ESTADOS = ["Pendiente", "Confirmado", "En camino", "Completado", "Cancelado"];

interface Props {
  clientes: { id: string; nombre: string }[];
  coordinadores: { id: string; nombre: string }[];
}

const initialState: { error?: string } = {};

export function NuevoServicioForm({ clientes, coordinadores }: Props) {
  const [state, formAction, pending] = useActionState(crearServicioAction, initialState);

  return (
    <form action={formAction} className={styles.form}>
      <div className={styles.formHeader}>
        <Link href="/admin" className={styles.back}>← Volver</Link>
        <h1 className={styles.title}>Nueva cita</h1>
      </div>

      <div className={styles.grid}>
        <div className={styles.field}>
          <label htmlFor="clienteId">Cliente</label>
          <select id="clienteId" name="clienteId" className="input-field">
            <option value="">— Sin asignar —</option>
            {clientes.map((c) => (
              <option key={c.id} value={c.id}>{c.nombre}</option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="coordinadorId">Coordinador</label>
          <select id="coordinadorId" name="coordinadorId" className="input-field">
            <option value="">— Sin asignar —</option>
            {coordinadores.map((c) => (
              <option key={c.id} value={c.id}>{c.nombre}</option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="tipoServicio">Tipo de servicio</label>
          <select id="tipoServicio" name="tipoServicio" className="input-field">
            <option value="">— Seleccionar —</option>
            {TIPOS_SERVICIO.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="estado">Estado</label>
          <select id="estado" name="estado" className="input-field" defaultValue="Pendiente">
            {ESTADOS.map((e) => (
              <option key={e} value={e}>{e}</option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="fecha">Fecha y hora *</label>
          <input id="fecha" name="fecha" type="datetime-local" className="input-field" required />
        </div>
        <div className={styles.field}>
          <label htmlFor="direccionOrigen">Dirección origen</label>
          <input id="direccionOrigen" name="direccionOrigen" className="input-field" />
        </div>
        <div className={`${styles.field} ${styles.fullWidth}`}>
          <label htmlFor="direccionDestino">Dirección destino</label>
          <input id="direccionDestino" name="direccionDestino" className="input-field" />
        </div>
        <div className={`${styles.field} ${styles.fullWidth}`}>
          <label htmlFor="notas">Notas</label>
          <textarea id="notas" name="notas" className="input-field" rows={3} />
        </div>
      </div>

      {state?.error && <p className={styles.error}>{state.error}</p>}

      <button type="submit" className="btn btn-primary" disabled={pending} style={{ alignSelf: "flex-start" }}>
        {pending ? "Guardando..." : "Crear cita"}
      </button>
    </form>
  );
}
