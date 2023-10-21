import * as passwordSvc from '../services/password.service';

export const forgot = async (req, res) => {
  const { email } = req.body;

  const result = await passwordSvc.forgot(email);

  res.ok(result);
};

export const update = async (req, res) => {
  const { newPassword } = req.body;

  const result = await passwordSvc.update(req.user, newPassword);

  res.ok(result);
};
