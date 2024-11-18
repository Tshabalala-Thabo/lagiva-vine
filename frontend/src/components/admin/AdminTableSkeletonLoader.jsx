import React from 'react';

const AdminTableSkeletonLoader = ({ columns = 3 }) => {
  return (
    <div className="animate-pulse">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-300">
            <th colSpan={columns} className="px-4 py-2">
              <div className="h-4 bg-gray-300 rounded"></div>
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <td key={colIndex} className="px-4 py-2">
                  <div className="h-8 bg-gray-300 rounded"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTableSkeletonLoader;
