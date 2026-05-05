"use client";

import { Event as AppEvent } from "@/data/mockEvents";
import styles from "./EventModal.module.css";

interface EventModalProps {
  event: AppEvent;
  onClose: () => void;
}

export default function EventModal({ event, onClose }: EventModalProps) {
  return (
    <div className={styles.overlay}>
      <div className={`glass-card ${styles.modal}`}>
        <button
          onClick={onClose}
          className={styles.closeBtn}
        >&times;</button>

        <h2 className={styles.title}>
          {event.title}
        </h2>
        <div className={styles.patientName}>
          👤 {event.patientName}
        </div>

        <div className={styles.details}>
          <p><strong>📅 Fecha:</strong> {event.date} a las {event.time}</p>
          <p><strong>📍 Dirección:</strong> {event.address}</p>
          <p><strong>🤝 Requiere acompañamiento:</strong> {event.requiresAccompaniment ? "Sí" : "No"}</p>
          {event.requiresAccompaniment && (
            <div className={styles.transportDetails}>
              <p className={styles.transportItem}> 🚑 <strong>Aux. de enfermeria:</strong> {event.acompaniment || "Pendiente"}</p>
            </div>
          )}
          <p><strong>🚗 Requiere transporte:</strong> {event.requiresTransport ? "Sí" : "No"}</p>
          {event.requiresTransport && (
            <div className={styles.transportDetails}>
              <p className={styles.transportItem}>🧑‍✈️ <strong>Conductor:</strong> {event.transportDriver || "Pendiente"}</p>
              <p className={styles.transportItem}>🚘 <strong>Placa:</strong> {event.transportPlate || "Pendiente"}</p>
              <p>⏰ <strong>Hora de recogida:</strong> {event.transportTime || "Pendiente"}</p>
            </div>
          )}
        </div>

        <div className={styles.footer}>
          <button className="btn btn-primary" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
