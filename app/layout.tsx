import type { Metadata } from "next";
import { Roboto } from 'next/font/google'
import "./globals.css";
import { getServerSideAuth } from '@/context/authUtils';
import { AuthProvider } from '@/context/authContext';
import Nav from "@/components/elements/Nav";
import MobileNav from "@/components/elements/MobileNav";

const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialAuthState = getServerSideAuth();
  return (
    <html lang="en">
   <body
      className={`${roboto.className} antialiased`}
      >
        {initialAuthState ? <Nav /> : null}
        {initialAuthState ? <MobileNav /> : null}
        <AuthProvider initialAuthState={initialAuthState}>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
