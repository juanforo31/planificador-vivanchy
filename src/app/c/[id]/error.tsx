"use client";

export default function ClienteError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="page-container">
      <main style={{ textAlign: "center", marginTop: "4rem" }}>
        <h1>No pudimos cargar tu información</h1>
        <p>Ocurrió un problema al consultar tus citas. Intenta de nuevo en unos minutos.</p>
        <button className="btn btn-primary" onClick={reset} style={{ marginTop: "1rem" }}>
          Reintentar
        </button>
      </main>
    </div>
  );
}
