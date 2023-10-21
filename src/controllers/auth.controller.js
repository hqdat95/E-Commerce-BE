import { GrantType } from '../constants';
import { getAuthUrl } from '../services/google.service';
import { registerSvc, localLoginSvc, googleLoginSvc, refreshTokenSvc } from '../services/auth.service';

export const registerCtrl = async (req, res) => {
  const { username, email, password } = req.body;

  const result = await registerSvc({ username, email, password });

  res.created(result);
};

export const loginCtrl = async (req, res) => {
  const { grantType, email, password, code } = req.body;

  let result;

  switch (grantType) {
    case GrantType.LOCAL_LOGIN:
      result = await localLoginSvc(email, password);

      return res.ok(result);

    case GrantType.GOOGLE_LOGIN:
      result = await googleLoginSvc(code);

      return res.ok(result);
  }
};

export const googleLoginURL = async (req, res) => {
  const result = getAuthUrl();

  res.ok(result);
};

export const refreshTokenCtrl = async (req, res) => {
  const result = await refreshTokenSvc(req.user);

  res.created(result);
};
