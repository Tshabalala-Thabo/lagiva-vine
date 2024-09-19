import React from 'react';

const AdminTableSkeletonLoader = () => {
  return (
    <div className="animate-pulse">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2 bg-gray-200 h-6 w-1/4"></th>
            <th className="border border-gray-300 p-2 bg-gray-200 h-6 w-1/4"></th>
            <th className="border border-gray-300 p-2 bg-gray-200 h-6 w-1/4"></th>
            <th className="border border-gray-300 p-2 bg-gray-200 h-6 w-1/4"></th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }).map((_, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2 bg-gray-200 h-6"></td>
              <td className="border border-gray-300 p-2 bg-gray-200 h-6"></td>
              <td className="border border-gray-300 p-2 bg-gray-200 h-6"></td>
              <td className="border border-gray-300 p-2 bg-gray-200 h-6"></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTableSkeletonLoader;