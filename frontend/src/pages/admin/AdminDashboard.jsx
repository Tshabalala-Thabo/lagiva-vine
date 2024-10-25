import React from 'react';
import { Area_Chart } from '@/components/charts/Area_Chart';
import { Bar_Chart_Horizontal } from '@/components/charts/Bar_Chart_Horizontal';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Grid, ShoppingCart, Users } from "lucide-react"

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

  const overviewCards = [
    { title: "Active Users", value: "10,543", icon: Users },
    { title: "Total Products", value: "1,234", icon: Package },
    { title: "Categories", value: "25", icon: Grid },
    { title: "Total Orders", value: "3,456", icon: ShoppingCart },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Dashboard</h2>
      <div className='grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        <div className="mb-8 w-full">
          <Area_Chart />
        </div>
        <div className="mb-8 w-full">
          <Bar_Chart_Horizontal />
        </div>
      </div>
      <section className="mb-6 space-y-6">
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {overviewCards.map((card, index) => (
            <Card className="py-4 transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 cursor-pointer" key={index}>
              <div className="flex flex-row items-center justify-between space-y-0 px-6 pb-2">
                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                <card.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className='px-6'>
                <div className="text-2xl font-bold">{card.value}</div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
