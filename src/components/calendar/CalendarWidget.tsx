"use client";

import { Calendar, dateFnsLocalizer, Event as CalendarEvent } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { es } from "date-fns/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Event as AppEvent } from "@/data/mockEvents";
import styles from "./CalendarWidget.module.css";

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

interface CalendarWidgetProps {
  events: CalendarEvent[];
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  currentView: "month" | "week" | "work_week" | "day" | "agenda";
  setCurrentView: (view: "month" | "week" | "work_week" | "day" | "agenda") => void;
  onSelectEvent: (event: AppEvent) => void;
}

export default function CalendarWidget({
  events,
  currentDate,
  setCurrentDate,
  currentView,
  setCurrentView,
  onSelectEvent
}: CalendarWidgetProps) {
  return (
    <div className={`glass-panel ${styles.container}`}>
      <h2 className={styles.title}>Calendario de Citas</h2>
      
      <div className={styles.calendarWrapper}>
        <Calendar
          localizer={localizer}
          events={events}
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
          onSelectEvent={(calEvent) => onSelectEvent(calEvent.resource as AppEvent)}
          components={{
            event: ({ event }) => (
              <div>
                <strong>{(event.resource as AppEvent).patientName}</strong>
                <br />
                <span style={{ fontSize: "0.75rem", opacity: 0.9 }}>{(event.resource as AppEvent).title}</span>
              </div>
            )
          }}
        />
      </div>
    </div>
  );
}
