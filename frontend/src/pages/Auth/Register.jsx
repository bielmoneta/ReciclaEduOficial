import React, { useState } from "react";
import api from "../../api/api";
import "../../styles/global.css";

export default function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [tipo_usuario, setTipoUsuario] = useState("aluno");

  const register = async () => {
    try {
      await api.post("/auth/register", {
        nome,
        email,
        senha,        // ← CORRETO
        tipo_usuario
      });

      alert("Cadastro realizado! Faça login.");
      window.location.href = "/";
    } catch (err) {
      alert(err.response?.data?.error || "Erro ao cadastrar");
    }
  };

  return (
    <div className="auth-container">
      <h2>Cadastro</h2>

      <input
        placeholder="Nome completo"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

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

      <select
        value={tipo_usuario}
        onChange={(e) => setTipoUsuario(e.target.value)}
        style={{ marginBottom: "10px" }}
      >
        <option value="aluno">Aluno</option>
        <option value="professor">Professor</option>
        <option value="gestor">Gestor</option>
      </select>

      <button onClick={register}>Cadastrar</button>

      <p style={{ marginTop: "20px" }}>
        Já tem conta? <a href="/">Faça login</a>
      </p>
    </div>
  );
}
