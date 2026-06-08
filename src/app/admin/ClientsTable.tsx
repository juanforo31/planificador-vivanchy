"use client";

import { useState } from "react";
import styles from "./admin.module.css";

interface ClientRow {
  id: string;
  nombre: string;
  telefono?: string;
  email?: string;
}

export function ClientsTable({ clientes, baseUrl }: { clientes: ClientRow[]; baseUrl: string }) {
  const [copied, setCopied] = useState<string | null>(null);

  function copyLink(id: string) {
    navigator.clipboard.writeText(`${baseUrl}/c/${id}`);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  }

  if (clientes.length === 0) {
    return <p className={styles.empty}>No hay clientes aún. Crea el primero.</p>;
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Teléfono</th>
          <th>Email</th>
          <th>Link personal</th>
        </tr>
      </thead>
      <tbody>
        {clientes.map((c) => (
          <tr key={c.id}>
            <td>{c.nombre || "—"}</td>
            <td>{c.telefono || "—"}</td>
            <td>{c.email || "—"}</td>
            <td>
              <div className={styles.linkCell}>
                <span className={styles.linkText}>/c/{c.id}</span>
                <button className={styles.copyBtn} onClick={() => copyLink(c.id)}>
                  {copied === c.id ? "Copiado" : "Copiar"}
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
