// app/dashboard/layout.tsx
import { NextUIProvider } from '@nextui-org/react';
import Sidebar from '../components/Sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
      <div className="flex bg-gray-100">
        {/* Sidebar Component */}
        <Sidebar />
          {children}
      </div>
  );
}
