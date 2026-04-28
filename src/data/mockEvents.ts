export interface Event {
  id: string;
  patientName: string;
  date: string; // ISO format or YYYY-MM-DD
  time: string; // HH:mm
  title: string;
  address: string;
  requiresAccompaniment: boolean;
  requiresTransport: boolean;
}

export const mockEvents: Event[] = [
  {
    id: "1",
    patientName: "Hernando Pachón",
    date: "2026-01-23", // Assuming current year based on user data
    time: "09:00",
    title: "Cita: Reumatología",
    address: "Dir.: Calle 118 # 19 - 52 Cons. 504 Edif. Acocentro",
    requiresAccompaniment: true,
    requiresTransport: true,
  },
  {
    id: "2",
    patientName: "Hernando Pachón",
    date: "2026-01-26",
    time: "14:30",
    title: "Cita: Oftalmología",
    address: "Dir.: Av. 15 No. 118-03 Cons. 302",
    requiresAccompaniment: true,
    requiresTransport: true,
  },
  {
    id: "3",
    patientName: "María López",
    date: "2026-01-28",
    time: "10:00",
    title: "Cita: Cardiología",
    address: "Clínica del Country, Cons. 210",
    requiresAccompaniment: false,
    requiresTransport: true,
  }
];
