"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { crearCliente, crearServicio, NuevoServicioFields } from "@/lib/airtable";
import { EstadoServicio } from "@/types/event";

export async function loginAction(
  _prevState: { error?: string },
  formData: FormData
): Promise<{ error?: string }> {
  const password = formData.get("password") as string;
  if (password !== process.env.ADMIN_PASSWORD) {
    return { error: "Contraseña incorrecta" };
  }
  const cookieStore = await cookies();
  cookieStore.set("admin_session", "1", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  redirect("/admin");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  redirect("/admin/login");
}

export async function crearClienteAction(
  _prevState: { error?: string; success?: boolean },
  formData: FormData
): Promise<{ error?: string; success?: boolean }> {
  const nombre = (formData.get("nombre") as string)?.trim();
  if (!nombre) return { error: "El nombre es obligatorio" };

  try {
    await crearCliente({
      "Nombre Completo": nombre,
      "Teléfono": (formData.get("telefono") as string) || undefined,
      "email": (formData.get("email") as string) || undefined,
      "Dirección": (formData.get("direccion") as string) || undefined,
      "Fecha de nacimiento": (formData.get("fechaNacimiento") as string) || undefined,
      "Contacto Familiar": (formData.get("contactoFamiliar") as string) || undefined,
      "Teléfono Familiar": (formData.get("telefonoFamiliar") as string) || undefined,
      "Notas": (formData.get("notas") as string) || undefined,
    });
  } catch {
    return { error: "Error al crear el cliente en Airtable" };
  }
  redirect("/admin");
}

export async function crearServicioAction(
  _prevState: { error?: string; success?: boolean },
  formData: FormData
): Promise<{ error?: string; success?: boolean }> {
  const fecha = formData.get("fecha") as string;
  if (!fecha) return { error: "La fecha es obligatoria" };

  const clienteId = formData.get("clienteId") as string;
  const coordinadorId = formData.get("coordinadorId") as string;

  const fields: NuevoServicioFields = {
    "Fecha": fecha,
    "Tipo de Servicio": (formData.get("tipoServicio") as string) || undefined,
    "Estado": (formData.get("estado") as EstadoServicio) || "Pendiente",
    "Dirección Origen": (formData.get("direccionOrigen") as string) || undefined,
    "Dirección Destino": (formData.get("direccionDestino") as string) || undefined,
    "Notas": (formData.get("notas") as string) || undefined,
  };

  if (clienteId) fields["Cliente"] = [clienteId];
  if (coordinadorId) fields["Coordinador"] = [coordinadorId];

  try {
    await crearServicio(fields);
  } catch {
    return { error: "Error al crear el servicio en Airtable" };
  }
  redirect("/admin");
}
