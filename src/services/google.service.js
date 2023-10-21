import { google } from 'googleapis';
import createOAuthClient from '../configs/google.config';

const oauthClient = createOAuthClient();

export const infoGoogleOAuth = async (code) => {
  const { tokens } = await oauthClient.getToken(code);
  oauthClient.setCredentials(tokens);

  const oauth2 = google.oauth2({ version: 'v2', auth: oauthClient });
  const { data: userInfo } = await oauth2.userinfo.get();

  return userInfo;
};

export const getAuthUrl = () => {
  const scopes = [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
  ];

  return oauthClient.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: scopes,
  });
};
