'use client';

import React from 'react';
import { AdminLayout } from '../../core/components/admin/AdminLayout';

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // We pass children inside the AdminLayout where Outlet used to be.
  // I need to modify AdminLayout to accept children instead of using Outlet.
  return (
    <AdminLayout>
      {children}
    </AdminLayout>
  );
}
