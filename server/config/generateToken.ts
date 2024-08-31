import { Response } from 'express';
import jwt from 'jsonwebtoken';

const { ACTIVE_TOKEN_SECRET, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

if (!ACTIVE_TOKEN_SECRET || !ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
  throw new Error('Token secrets are not defined in environment variables');
}

export const generateActiveToken = (payload: object): string => {
  return jwt.sign(payload, ACTIVE_TOKEN_SECRET, { expiresIn: '5m' });
};

export const generateAccessToken = (payload: object): string => {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
};

export const generateRefreshToken = (payload: object, res: Response): string => {
  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: '30d' });

  res.cookie('refreshtoken', refreshToken, {
    sameSite: 'none',
    secure: true,
    httpOnly: true,
    path: '/api/refresh_token',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  return refreshToken;
};
