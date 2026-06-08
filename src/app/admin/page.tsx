import Link from "next/link";
import { headers } from "next/headers";
import { getClientes } from "@/lib/airtable";
import { logoutAction } from "./actions";
import { ClientsTable } from "./ClientsTable";
import styles from "./admin.module.css";

export default async function AdminPage() {
  const clientes = await getClientes();
  const headersList = await headers();
  const host = headersList.get("host") ?? "localhost:3000";
  const proto = host.startsWith("localhost") ? "http" : "https";
  const baseUrl = `${proto}://${host}`;

  const rows = clientes.map((c) => ({
    id: c.id,
    nombre: c.fields["Nombre Completo"],
    telefono: c.fields["Teléfono"],
    email: c.fields["email"],
  }));

  return (
    <div className="page-container">
      <div className={styles.header}>
        <h1>Panel Administrativo — Vivanchy</h1>
        <div className={styles.actions}>
          <Link href="/admin/clientes/nuevo" className={styles.btnSecondary}>
            + Nuevo cliente
          </Link>
          <Link href="/admin/servicios/nuevo" className={styles.btnSecondary}>
            + Nueva cita
          </Link>
          <form action={logoutAction}>
            <button type="submit" className={styles.btnDanger}>
              Cerrar sesión
            </button>
          </form>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: "1.5rem" }}>
        <ClientsTable clientes={rows} baseUrl={baseUrl} />
      </div>
    </div>
  );
}
