import { NuevoClienteForm } from "./NuevoClienteForm";

export default function NuevoClientePage() {
  return (
    <div className="page-container">
      <div className="glass-panel" style={{ padding: "2rem" }}>
        <NuevoClienteForm />
      </div>
    </div>
  );
}
