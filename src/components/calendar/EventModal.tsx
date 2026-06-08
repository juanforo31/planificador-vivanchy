"use client";

import { Event as AppEvent } from "@/types/event";
import styles from "./EventModal.module.css";

interface EventModalProps {
  event: AppEvent;
  onClose: () => void;
}

const fechaFormateada = (iso: string) =>
  new Date(iso).toLocaleString("es-CO", {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });

export default function EventModal({ event, onClose }: EventModalProps) {
  return (
    <div className={styles.overlay}>
      <div className={`glass-card ${styles.modal}`}>
        <button
          onClick={onClose}
          className={styles.closeBtn}
        >&times;</button>

        <h2 className={styles.title}>
          {event.tipoServicio}
        </h2>
        <div className={styles.patientName}>
          👤 {event.patientName}
        </div>

        <div className={styles.details}>
          <p><strong>📅 Fecha:</strong> {fechaFormateada(event.fecha)}</p>
          <p><strong>📋 Estado:</strong> {event.estado}</p>
          {event.direccionOrigen && (
            <p><strong>📍 Dirección de origen:</strong> {event.direccionOrigen}</p>
          )}
          {event.direccionDestino && (
            <p><strong>📍 Dirección de destino:</strong> {event.direccionDestino}</p>
          )}

          {event.coordinadorNombre && (
            <div className={styles.transportDetails}>
              <p className={styles.transportItem}>🧑‍⚕️ <strong>Coordinador:</strong> {event.coordinadorNombre}</p>
              {event.coordinadorRol && (
                <p className={styles.transportItem}>🏷️ <strong>Rol:</strong> {event.coordinadorRol}</p>
              )}
              {event.coordinadorTelefono && (
                <p>📞 <strong>Teléfono:</strong> {event.coordinadorTelefono}</p>
              )}
            </div>
          )}

          {event.notas && (
            <p><strong>📝 Notas:</strong> {event.notas}</p>
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
