"use client";

import { useState } from "react";
import { Event as AppEvent } from "@/types/event";
import { Event as CalendarEvent } from "react-big-calendar";
import Header from "@/components/layout/Header";
import CalendarWidget from "@/components/calendar/CalendarWidget";
import EventModal from "@/components/calendar/EventModal";

interface DashboardClientProps {
  clienteName: string;
  events: AppEvent[];
}

export default function DashboardClient({ clienteName, events }: DashboardClientProps) {
  const [selectedEvent, setSelectedEvent] = useState<AppEvent | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<"month" | "week" | "work_week" | "day" | "agenda">("month");

  const calendarEvents: CalendarEvent[] = events.map(event => {
    const start = new Date(event.fecha);
    const end = new Date(start.getTime() + 60 * 60 * 1000);

    return {
      title: `${event.tipoServicio} - ${event.patientName}`,
      start,
      end,
      resource: event
    };
  });

  return (
    <div className="page-container">
      <Header clienteName={clienteName} />

      <main>
        <CalendarWidget
          events={calendarEvents}
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          currentView={currentView}
          setCurrentView={setCurrentView}
          onSelectEvent={setSelectedEvent}
        />

        {selectedEvent && (
          <EventModal
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
          />
        )}
      </main>
    </div>
  );
}
