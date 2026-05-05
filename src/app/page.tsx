"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Event as AppEvent } from "@/data/mockEvents";
import { mockEvents } from "@/data/mockEvents";
import { Event as CalendarEvent } from "react-big-calendar";
import Header from "@/components/layout/Header";
import CalendarWidget from "@/components/calendar/CalendarWidget";
import EventModal from "@/components/calendar/EventModal";

export default function Dashboard() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<AppEvent | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
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
  const rawEvents = user.role === "admin"
    ? mockEvents
    : mockEvents.filter(e => e.patientName === user.name);

  const calendarEvents: CalendarEvent[] = rawEvents.map(event => {
    const [year, month, day] = event.date.split("-").map(Number);
    const [hours, minutes] = event.time.split(":").map(Number);
    const startDate = new Date(year, month - 1, day, hours, minutes);
    const endDate = new Date(year, month - 1, day, hours + 1, minutes);

    return {
      title: `${event.title} - ${event.patientName}`,
      start: startDate,
      end: endDate,
      resource: event
    };
  });

  return (
    <div className="page-container">
      <Header />

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
