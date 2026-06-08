import { getClientes, getCoordinadores } from "@/lib/airtable";
import { NuevoServicioForm } from "./NuevoServicioForm";

export default async function NuevoServicioPage() {
  const [clientes, coordinadores] = await Promise.all([getClientes(), getCoordinadores()]);

  const clienteOpts = clientes.map((c) => ({
    id: c.id,
    nombre: c.fields["Nombre Completo"] ?? c.id,
  }));

  const coordinadorOpts = coordinadores.map((c) => ({
    id: c.id,
    nombre: c.fields["Nombre"],
  }));

  return (
    <div className="page-container">
      <div className="glass-panel" style={{ padding: "2rem" }}>
        <NuevoServicioForm clientes={clienteOpts} coordinadores={coordinadorOpts} />
      </div>
    </div>
  );
}
