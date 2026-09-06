import { jwtVerify, SignJWT } from 'jose';
import { User } from '../types/auth';

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'super-secret-jwt-key-change-this'
);

export async function signToken(payload: User) {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(SECRET);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload as unknown as User;
  } catch {
    return null;
  }
}