import { notFound } from "next/navigation";
import {
  getClientePorId,
  getCoordinadores,
  getServicios,
  mapServicioToEvent,
} from "@/lib/airtable";
import DashboardClient from "./DashboardClient";

interface ClientePageProps {
  params: Promise<{ id: string }>;
}

export default async function ClientePage({ params }: ClientePageProps) {
  const { id } = await params;
  const cliente = await getClientePorId(id);

  if (!cliente) {
    notFound();
  }

  const [coordinadores, servicios] = await Promise.all([
    getCoordinadores(),
    getServicios(),
  ]);

  const clientesById = new Map([[cliente.id, cliente]]);
  const coordinadoresById = new Map(coordinadores.map(c => [c.id, c]));

  const serviciosDelCliente = servicios.filter(s => s.fields.Cliente?.includes(cliente.id));

  const events = serviciosDelCliente.map(s =>
    mapServicioToEvent(s, clientesById, coordinadoresById)
  );

  return <DashboardClient clienteName={cliente.fields["Nombre Completo"]} events={events} />;
}
