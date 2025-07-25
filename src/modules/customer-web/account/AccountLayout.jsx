import React from 'react';
import { Outlet } from 'react-router-dom';
import AccountSidebar from './AccountSidebar';

export default function AccountLayout() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <AccountSidebar />
      <main className="flex-1 px-4 py-4">
        <Outlet />
      </main>
    </div>
  );
}
