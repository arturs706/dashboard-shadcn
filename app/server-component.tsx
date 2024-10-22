// server-component.tsx
import 'server-only';
import ClientComponent from './client-component';
import { cookies } from "next/headers";

export function decodeToken(token: string): Record<string, any> {
    const base64Url = token.split('.')[1]; 
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decodedPayload = Buffer.from(base64, 'base64').toString('utf8');
    return JSON.parse(decodedPayload);
}

export async function getData() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  if (!accessToken) {
    throw new Error("Access token not found");
  }
  const uuid = decodeToken(accessToken).sub;
  const res = await fetch(`http://127.0.0.1:10000/api/v1/users/${uuid}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    }}
  );

  const data = await res.json();
  return data;
}

export default async function ServerComponent() {
  const data = await getData();
  return <ClientComponent data={data} />;
}
