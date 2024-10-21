// authUtils.ts (Server-side file)
import { cookies } from 'next/headers';

export function getServerSideAuth() {
  const cookieStore = cookies();
  return !!cookieStore.get('access_token');
}