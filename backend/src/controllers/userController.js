import User from "../models/user.js";

export const list = async (req, res) => {
  const users = await User.findAll({ attributes: ['id','name','email','points'] });
  res.json(users);
};

export const getById = async (req, res) => {
  const user = await User.findByPk(req.params.id, { attributes: ['id','name','email','points'] });
  if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
  res.json(user);
};

export const addPoints = async (req, res) => {
  const { points } = req.body;
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
  user.points += Number(points || 0);
  await user.save();
  res.json(user);
};
