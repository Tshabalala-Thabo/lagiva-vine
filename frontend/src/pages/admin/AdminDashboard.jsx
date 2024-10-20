import React from 'react';
import { DataTable } from '@/components/DataTable';

const columns = [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  // ... define other columns ...
]

const AdminDashboard = () => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    // Fetch data from an API or load it from somewhere
    // Then update the state
    // setData(fetchedData)
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Admin Dashboard</h2>
      <p className="mb-4">Welcome to the admin dashboard! Only accessible by admin users.</p>
      <DataTable data={data} columns={columns} />
    </div>
  );
};

export default AdminDashboard;
