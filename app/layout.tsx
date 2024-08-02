import Navbar from '@/components/navbar/Navbar';
import React from 'react';
import './globals.css';
import Footer from '@/components/footer/Footer';
import { NextAuthProvider } from '@/components/auth/NextAuthProvider';

export default function AuthLayout({
  modal,
  children,
}: Readonly<{ modal: React.ReactNode; children: React.ReactNode }>) {
  return (
    <html lang="en" className="">
      <body className="min-w-sm max-w-screen-2xl mx-auto bg-light-background dark:bg-dark-background dark:text-dark-text text-light-text">
        <NextAuthProvider>
          <div
            className="dark:hidden lg:w-[800px] lg:h-[800px] 
          absolute top-0 right-0 -z-10 blur-3xl bg-opacity-30 bg-gradient-to-r 
          from-blue-100 to-white rounded-full"
          />

          <div
            className="dark:hidden lg:w-[800px] lg:h-[800px] w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] xl:w-[600px] xl:h-[600px] 2xl:w-[700px] 2xl:h-[700px]
          absolute bottom-0 left-0 -z-10 blur-3xl bg-opacity-30 bg-gradient-to-r 
          from-blue-200 to-white rounded-full"
          />

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
