import Navbar from '@/components/navbar/Navbar';
import React from 'react';
import './globals.css';
import Footer from '@/components/footer/Footer';
import { NextAuthProvider } from '@/components/NextAuthProvider';

export default function AuthLayout({
  modal,
  children,
}: Readonly<{ modal: React.ReactNode; children: React.ReactNode }>) {
  return (
    <html lang="en" className="">
      <body className="min-w-sm max-w-screen-2xl mx-auto bg-light-background dark:bg-dark-background dark:text-dark-text text-light-text">
        <NextAuthProvider>
          <div id="modal-root" />
          {modal}
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow container mx-auto p-6">{children}</div>
            <Footer />
          </div>
        </NextAuthProvider>
      </body>
    </html>
  );
}
