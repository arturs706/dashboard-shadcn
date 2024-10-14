"use client";

import Link from "next/link";
import { useAuth } from "@/context/authContext";

export default function Home() {
  const { isAuthenticated } = useAuth();
  return (
    <main>
      {isAuthenticated ? 
      <div>
        <span>Authenticated</span>
        <br />
        <Link href="/diary">Diary</Link>
      </div> : 
      <div><Link href="/login">Login</Link></div>}
    </main>
  )
}
