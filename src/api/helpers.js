import * as jose from 'jose';

import { env } from '@/lib/env';
import { getItem } from '@/lib/utils/localStorage';

const JWT_SECRET_KEY = 'demokey';
const jwtSecret = new TextEncoder().encode(JWT_SECRET_KEY);

export const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getDatabaseTable = (entity) => getItem(env.DB_KEY)?.[entity];

export const withAuth =
  (...data) =>
  async (config) => {
    const token = config.headers.Authorization?.split(' ')[1];

    const verified = token ? await verifyToken(token) : false;

    if (env.USE_AUTH && !verified) {
      return [403, { message: 'Unauthorized' }];
    }

    return typeof data[0] === 'function' ? data[0](config) : data;
  };

export const verifyToken = async (token, options = undefined) => {
  try {
    const verification = await jose.jwtVerify(token, jwtSecret);
    return options?.returnPayload ? verification.payload : true;
  } catch {
    return false;
  }
};

export const generateRefreshToken = async (data) => {
  return await new jose.SignJWT({ data })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('30d')
    .sign(jwtSecret);
};

export const generateAccessToken = async (data) => {
  return await new jose.SignJWT({ data })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('15m')
    .sign(jwtSecret);
};
