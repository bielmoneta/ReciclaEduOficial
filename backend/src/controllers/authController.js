import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";

export const register = async (req, res) => {
  try {
    console.log("DEBUG register body:", req.body);

    const { nome, email, senha, tipo_usuario } = req.body;

    if (!nome || !email || !senha || !tipo_usuario) {
      return res.status(400).json({
        error: "Campos obrigatórios faltando (nome, email, senha, tipo_usuario)"
      });
    }

    const existe = await Usuario.findOne({ where: { email } });
    if (existe) return res.status(400).json({ error: "Email já cadastrado" });

    const hash = await bcrypt.hash(senha, 10);

    const novoUsuario = await Usuario.create({
      nome,
      email,
      senha: hash,
      tipo_usuario
    });

    return res.status(201).json({ message: "Cadastro realizado com sucesso" });
  } catch (err) {
    console.error("🔥 ERRO NO REGISTER:", err);
    return res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    console.log("DEBUG login body:", req.body);

    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ error: "Email e senha são obrigatórios" });
    }

    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) return res.status(404).json({ error: "Usuário não encontrado" });

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) return res.status(400).json({ error: "Senha incorreta" });

    const token = jwt.sign(
      { id: usuario.id, tipo_usuario: usuario.tipo_usuario },
      "secreta123",
      { expiresIn: "1d" }
    );

    return res.json({
      message: "Login realizado com sucesso",
      token,
      usuario
    });

  } catch (err) {
    console.error("🔥 ERRO NO LOGIN:", err);
    return res.status(500).json({ error: err.message });
  }
};
