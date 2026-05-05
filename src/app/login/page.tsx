"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && !isLoading) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const success = await login(email, password);
    if (success) {
      router.push("/");
    } else {
      setError("Credenciales inválidas. Intenta nuevamente.");
      setIsSubmitting(false);
    }
  };

  if (isLoading || user) return null;

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
      <div className="glass-panel" style={{ padding: "3rem", width: "100%", maxWidth: "400px" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <Image
            src="/logo.jpeg"
            alt="Vivanchy Logo"
            width={120}
            height={120}
            style={{ margin: "0 auto", display: "block" }}
          />
          <h1 style={{ fontSize: "1.8rem", fontWeight: "bold", color: "var(--primary)", marginTop: "1rem" }}>Planificador</h1>
          <p style={{ color: "var(--text-muted)", marginTop: "0.5rem" }}>Inicia sesión para continuar</p>
        </div>

        {error && (
          <div style={{ padding: "0.75rem", backgroundColor: "rgba(239, 68, 68, 0.1)", color: "var(--danger)", borderRadius: "8px", marginBottom: "1.5rem", fontSize: "0.9rem", border: "1px solid rgba(239, 68, 68, 0.2)" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", fontWeight: 500 }}>
              Correo electrónico
            </label>
            <input
              type="email"
              className="input-field"
              placeholder="ej. admin@test.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", fontWeight: 500 }}>
              Contraseña
            </label>
            <input
              type="password"
              className="input-field"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%", marginTop: "0.5rem", opacity: isSubmitting ? 0.7 : 1 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Iniciando..." : "Ingresar"}
          </button>
        </form>

        <div style={{ marginTop: "2rem", fontSize: "0.8rem", color: "var(--text-muted)", textAlign: "center" }}>
          <p>Usuarios de prueba:</p>
          <p>admin@test.com / password</p>
          <p>usuario@test.com / password</p>
        </div>
      </div>
    </div>
  );
}
