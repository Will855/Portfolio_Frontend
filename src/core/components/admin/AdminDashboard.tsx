import React from 'react';
import { redirect } from 'next/navigation';

export const AdminDashboard: React.FC = () => {
  redirect('/admin/hero');
};
