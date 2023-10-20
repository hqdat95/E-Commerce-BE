import { GrantType } from '../constants';
import { registerSvc, localLoginSvc } from '../services/auth.service';

export const registerCtrl = async (req, res) => {
  const { username, email, password } = req.body;

  const result = await registerSvc({ username, email, password });

  res.created(result);
};

export const loginCtrl = async (req, res) => {
  const { grantType, email, password } = req.body;

  let result;

  switch (grantType) {
    case GrantType.LOCAL_LOGIN:
      result = await localLoginSvc(email, password);

      return res.ok(result);

    case GrantType.GOOGLE_LOGIN:
      result = await googleLoginSvc();

      return res.ok(result);
  }
};
