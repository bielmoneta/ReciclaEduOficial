import React, { useState } from "react";
import api from "../../api/api";
import "../../styles/global.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const login = async () => {
    try {
      const res = await api.post("/auth/login", {
        email,
        senha      // ← aqui está o nome correto
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("usuario", JSON.stringify(res.data.usuario));

      alert("Login realizado!");
      window.location.href = "/dashboard";
    } catch (err) {
      alert(err.response?.data?.error || "Erro ao fazer login");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />

      <button onClick={login}>Entrar</button>

      <p style={{ marginTop: "20px" }}>
        Não tem conta? <a href="/register">Cadastre-se</a>
      </p>
    </div>
  );
}
