'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useAppDataReady } from '../../core/hooks/useAppDataReady';
import { LoadingScreen } from '../../core/components/LoadingScreen';
import NavMenu from '../../core/components/navbar/navMenu';
import DockMobileNav from '../../core/components/navbar/DockMobileNav';

const BackgroundStars = dynamic(() => import('../../core/components/StarsBackground'), { ssr: false });

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isReady, hasError } = useAppDataReady();

  if (hasError) {
    // In Next.js, we can also use error.tsx or not-found.tsx, but for now we fallback:
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-[#0a0a0a] text-center px-4">
        <h1 className="text-4xl font-bold text-red-500 mb-4">Error 404</h1>
        <p className="text-slate-400">Hubo un problema de conexión con la base de datos.</p>
      </div>
    );
  }

  if (!isReady) return <LoadingScreen />;

  return (
    <>
      <NavMenu />
      <BackgroundStars />
      <DockMobileNav />
      <main>
        {children}
      </main>
    </>
  );
}
