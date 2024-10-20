import React from 'react';
import { DataTableDemo } from '@/components/DataTable';

const AdminDashboard = () => {
  console.log('Rendering AdminDashboard');
  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Admin Dashboard</h2>
      <p className="mb-4">Welcome to the admin dashboard! Only accessible by admin users.</p>
      {DataTableDemo ? (
        <div className="border p-4 mb-4">
          <h3 className="text-lg mb-2">Data Table:</h3>
          <DataTableDemo />
        </div>
      ) : (
        <p className="text-red-500">Error: DataTableDemo component not found</p>
      )}
    </div>
  );
};

export default AdminDashboard;
