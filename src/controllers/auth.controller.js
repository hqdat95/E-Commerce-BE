import { registerSvc } from '../services/auth.service';

export const registerCtrl = async (req, res) => {
  const { username, email, password } = req.body;

  const result = await registerSvc({ username, email, password });

  res.created(result);
};
