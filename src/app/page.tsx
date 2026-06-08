import Image from "next/image";

export default function Home() {
  return (
    <div className="page-container">
      <main style={{ textAlign: "center", marginTop: "4rem" }}>
        <div className="glass-panel" style={{ display: "inline-block", padding: "2.5rem" }}>
          <Image src="/logo.jpeg" alt="Vivanchy Logo" width={120} height={120} />
          <h1>Planificador | Vivanchy</h1>
          <p>
            Para ver tus citas, ingresa al enlace personal que Vivanchy compartió contigo.
            Si no lo tienes a la mano, contáctanos y te lo enviaremos de nuevo.
          </p>
        </div>
      </main>
    </div>
  );
}
