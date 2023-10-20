import { GrantType } from '../constants';
import * as authSvc from '../services/auth.service';
import * as googleSvc from '../services/google.service';

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  const result = await authSvc.register({ username, email, password });

  res.created(result);
};

export const login = async (req, res) => {
  const { grantType, email, password, code } = req.body;

  let result;

  switch (grantType) {
    case GrantType.LOCAL_LOGIN:
      result = await authSvc.localLogin(email, password);

      return res.ok(result);

    case GrantType.GOOGLE_LOGIN:
      result = await authSvc.googleLogin(code);

      return res.ok(result);
  }
};

export const googleLoginURL = async (req, res) => {
  const result = googleSvc.getAuthUrl();

  res.ok(result);
};

export const refreshToken = async (req, res) => {
  const result = await authSvc.refreshToken(req.user);

  res.created(result);
};

export const logout = async (req, res) => {
  const result = await authSvc.logout(req.user);

  res.ok(result);
};
