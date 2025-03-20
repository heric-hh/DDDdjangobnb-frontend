'use server';

import { cookies } from 'next/headers';

export async function handleLogin(
  userId: string,
  accessToken: string,
  refreshToken: string
) {
  const cookieStore = cookies(); // Obtén la instancia de cookies

  (await cookieStore).set('session_userid', userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });

  (await cookieStore).set('session_access_token', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60,
    path: '/',
  });

  (await cookieStore).set('session_refresh_token', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });
}

export async function resetAuthCookies() {
  const cookieStore = cookies(); // Obtén la instancia de cookies

  (await cookieStore).set('session_userid', '');
  (await cookieStore).set('session_access_token', '');
  (await cookieStore).set('session_refresh_token', '');
}

export async function getUserId() {
  const cookieStore = cookies(); // Obtén la instancia de cookies
  const userId = (await cookieStore).get('session_userid')?.value; // Usa await aquí
  return userId ? userId : null; // Devuelve el valor de la cookie o null si no existe
}

export async function getAccessToken() {
  let cookieStore = cookies();
  let accessToken = (await cookieStore).get('session_access_token')?.value;
  return accessToken;
}
