import { Event, EstadoServicio } from "@/types/event";

const AIRTABLE_API_URL = "https://api.airtable.com/v0";

const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;

interface AirtableRecord<TFields> {
  id: string;
  fields: TFields;
}

interface AirtableListResponse<TFields> {
  records: AirtableRecord<TFields>[];
}

function assertCredentials() {
  if (!AIRTABLE_TOKEN || !AIRTABLE_BASE_ID) {
    throw new Error("Faltan AIRTABLE_TOKEN o AIRTABLE_BASE_ID en las variables de entorno");
  }
}

function authHeaders() {
  return { Authorization: `Bearer ${AIRTABLE_TOKEN}` };
}

async function airtableFetch<TFields>(
  table: string,
  params?: Record<string, string>
): Promise<AirtableRecord<TFields>[]> {
  assertCredentials();

  const url = new URL(`${AIRTABLE_API_URL}/${AIRTABLE_BASE_ID}/${encodeURIComponent(table)}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));
  }

  const response = await fetch(url.toString(), { headers: authHeaders(), cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Airtable respondió ${response.status} al consultar la tabla "${table}"`);
  }

  const data: AirtableListResponse<TFields> = await response.json();
  return data.records;
}

async function airtableFetchById<TFields>(
  table: string,
  recordId: string
): Promise<AirtableRecord<TFields> | null> {
  assertCredentials();

  const url = `${AIRTABLE_API_URL}/${AIRTABLE_BASE_ID}/${encodeURIComponent(table)}/${recordId}`;
  const response = await fetch(url, { headers: authHeaders(), cache: "no-store" });

  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error(`Airtable respondió ${response.status} al consultar el registro "${recordId}" en "${table}"`);
  }

  return response.json();
}

export type CoordinadorRol = "Auxiliar Enfermería" | "Cuidadora" | "Conductor";

export interface ClienteFields {
  "Nombre Completo": string;
  "Teléfono"?: string;
  "email"?: string;
  "Dirección"?: string;
  "Fecha de nacimiento"?: string;
  "Contacto Familiar"?: string;
  "Teléfono Familiar"?: string;
  "Notas"?: string;
  "Servicios"?: string[];
}

export interface CoordinadorFields {
  "Nombre": string;
  "Teléfono"?: string;
  "Email"?: string;
  "Rol"?: CoordinadorRol;
  "Activo"?: boolean;
  "Servicios"?: string[];
}

export interface ServicioFields {
  "IDServicio": number;
  "Cliente"?: string[];
  "Coordinador"?: string[];
  "Tipo de Servicio"?: string;
  "Estado"?: EstadoServicio;
  "Fecha": string;
  "Dirección Origen"?: string;
  "Dirección Destino"?: string;
  "Notas"?: string;
}

export type ClienteRecord = AirtableRecord<ClienteFields>;
export type CoordinadorRecord = AirtableRecord<CoordinadorFields>;
export type ServicioRecord = AirtableRecord<ServicioFields>;

export async function getClientePorId(id: string): Promise<ClienteRecord | null> {
  return airtableFetchById<ClienteFields>("Clientes", id);
}

export async function getClientes(): Promise<ClienteRecord[]> {
  return airtableFetch<ClienteFields>("Clientes", { sort: "[{field:'Nombre Completo',direction:'asc'}]" });
}

export async function getCoordinadores(): Promise<CoordinadorRecord[]> {
  return airtableFetch<CoordinadorFields>("Coordinadores");
}

export async function getServicios(): Promise<ServicioRecord[]> {
  return airtableFetch<ServicioFields>("Servicios");
}

async function airtableCreate<TFields>(
  table: string,
  fields: Partial<TFields>
): Promise<AirtableRecord<TFields>> {
  assertCredentials();
  const url = `${AIRTABLE_API_URL}/${AIRTABLE_BASE_ID}/${encodeURIComponent(table)}`;
  const response = await fetch(url, {
    method: "POST",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify({ fields }),
  });
  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Airtable respondió ${response.status} al crear en "${table}": ${err}`);
  }
  return response.json();
}

export async function crearCliente(fields: Omit<ClienteFields, "Servicios">): Promise<ClienteRecord> {
  return airtableCreate<ClienteFields>("Clientes", fields);
}

export interface NuevoServicioFields {
  "Cliente"?: string[];
  "Coordinador"?: string[];
  "Tipo de Servicio"?: string;
  "Estado"?: EstadoServicio;
  "Fecha": string;
  "Dirección Origen"?: string;
  "Dirección Destino"?: string;
  "Notas"?: string;
}

export async function crearServicio(fields: NuevoServicioFields): Promise<ServicioRecord> {
  return airtableCreate<ServicioFields>("Servicios", fields);
}

export function mapServicioToEvent(
  servicio: ServicioRecord,
  clientesById: Map<string, ClienteRecord>,
  coordinadoresById: Map<string, CoordinadorRecord>
): Event {
  const fields = servicio.fields;
  const cliente = fields.Cliente?.[0] ? clientesById.get(fields.Cliente[0]) : undefined;
  const coordinador = fields.Coordinador?.[0] ? coordinadoresById.get(fields.Coordinador[0]) : undefined;

  return {
    id: servicio.id,
    idServicio: fields.IDServicio,
    patientName: cliente?.fields["Nombre Completo"] ?? "Sin asignar",
    tipoServicio: fields["Tipo de Servicio"] ?? "Servicio",
    estado: fields.Estado ?? "Pendiente",
    fecha: fields.Fecha,
    direccionOrigen: fields["Dirección Origen"],
    direccionDestino: fields["Dirección Destino"],
    notas: fields.Notas,
    coordinadorNombre: coordinador?.fields.Nombre,
    coordinadorTelefono: coordinador?.fields.Teléfono,
    coordinadorRol: coordinador?.fields.Rol,
  };
}
