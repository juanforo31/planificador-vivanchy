"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Calendar, dateFnsLocalizer, Event as CalendarEvent } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { es } from "date-fns/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { mockEvents, Event as AppEvent } from "@/data/mockEvents";

const locales = {
  "es": es,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function Dashboard() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<AppEvent | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1));
  const [currentView, setCurrentView] = useState<"month" | "week" | "work_week" | "day" | "agenda">("month");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (!mounted || isLoading || !user) return null;

  // Convert mock events to react-big-calendar format
  const calendarEvents: CalendarEvent[] = mockEvents.map(event => {
    const [year, month, day] = event.date.split("-").map(Number);
    const [hours, minutes] = event.time.split(":").map(Number);
    const startDate = new Date(year, month - 1, day, hours, minutes);
    const endDate = new Date(year, month - 1, day, hours + 1, minutes); // Assuming 1 hour per event

    return {
      title: `${event.title} - ${event.patientName}`,
      start: startDate,
      end: endDate,
      resource: event
    };
  });

  return (
    <div className="page-container">
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontSize: "2rem", color: "var(--primary)" }}>Planificador</h1>
          <p style={{ color: "var(--text-muted)" }}>Bienvenido, {user.name}</p>
        </div>
        <button onClick={logout} className="btn" style={{ background: "rgba(239, 68, 68, 0.1)", color: "var(--danger)" }}>
          Cerrar Sesión
        </button>
      </header>

      <main>
        <div className="glass-panel" style={{ padding: "2rem", minHeight: "70vh" }}>
          <h2 style={{ marginBottom: "1.5rem" }}>Calendario de Citas</h2>
          
          <div style={{ height: "600px" }}>
            <Calendar
              localizer={localizer}
              events={calendarEvents}
              date={currentDate}
              onNavigate={(newDate) => setCurrentDate(newDate)}
              view={currentView}
              onView={(newView) => setCurrentView(newView)}
              startAccessor="start"
              endAccessor="end"
              culture="es"
              messages={{
                next: "Sig",
                previous: "Ant",
                today: "Hoy",
                month: "Mes",
                week: "Semana",
                day: "Día",
                agenda: "Agenda",
              }}
              eventPropGetter={() => ({
                style: {
                  backgroundColor: "var(--primary)",
                  borderRadius: "6px",
                  border: "none",
                  display: "block",
                  padding: "2px 5px",
                  fontSize: "0.85rem",
                  color: "white"
                }
              })}
              onSelectEvent={(calEvent) => setSelectedEvent(calEvent.resource)}
              components={{
                event: ({ event }) => (
                  <div>
                    <strong>{event.resource.patientName}</strong>
                    <br />
                    <span style={{ fontSize: "0.75rem", opacity: 0.9 }}>{event.resource.title}</span>
                  </div>
                )
              }}
            />
          </div>
        </div>

        {selectedEvent && (
          <div style={{
            position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000
          }}>
            <div className="glass-card" style={{ padding: "2rem", width: "100%", maxWidth: "500px", position: "relative" }}>
              <button 
                onClick={() => setSelectedEvent(null)}
                style={{ position: "absolute", top: "1rem", right: "1rem", background: "none", border: "none", fontSize: "1.5rem", cursor: "pointer", color: "var(--text-muted)" }}
              >&times;</button>
              
              <h2 style={{ marginBottom: "0.5rem", color: "var(--primary)", paddingRight: "2rem" }}>
                {selectedEvent.title}
              </h2>
              <div style={{ marginBottom: "1.5rem", fontWeight: 500, fontSize: "1.1rem" }}>
                👤 {selectedEvent.patientName}
              </div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", color: "var(--text-muted)", fontSize: "0.95rem" }}>
                <p><strong>📅 Fecha:</strong> {selectedEvent.date} a las {selectedEvent.time}</p>
                <p><strong>📍 Dirección:</strong> {selectedEvent.address}</p>
                <p><strong>🤝 Requiere acompañamiento:</strong> {selectedEvent.requiresAccompaniment ? "Sí" : "No"}</p>
                <p><strong>🚗 Requiere transporte:</strong> {selectedEvent.requiresTransport ? "Sí" : "No"}</p>
              </div>

              <div style={{ marginTop: "2rem", display: "flex", justifyContent: "flex-end" }}>
                <button className="btn btn-primary" onClick={() => setSelectedEvent(null)}>
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
