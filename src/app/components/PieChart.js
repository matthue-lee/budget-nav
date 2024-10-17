'use client'; // Required for Next.js client-side components
import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function StackedPieChart() {
  const [data1, setData1] = React.useState([]); // Outer pie chart data for categories
  const [data2, setData2] = React.useState([]); // Inner pie chart data for descriptions
  const [isLoading, setIsLoading] = React.useState(true);

  // Fetch transaction data from API and process it for the pie chart
  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/transactions');
        const transactions = await response.json();

        // Process data to group by category and sum amounts for outer chart (data1)
        const categoryTotals = transactions.reduce((acc, transaction) => {
          const category = transaction.category;
          const amount = Math.abs(transaction.amount); // Use absolute value to handle negative amounts

          if (acc[category]) {
            acc[category].total += amount;
          } else {
            acc[category] = { total: amount, descriptions: [] };
          }
          acc[category].descriptions.push({
            description: transaction.description,
            amount: amount,
          });
          return acc;
        }, {});

        // Convert categoryTotals into pie chart format for data1 and data2
        const outerData = Object.keys(categoryTotals).map((category) => ({
          label: category,
          value: categoryTotals[category].total,
        }));

        const innerData = Object.keys(categoryTotals).flatMap((category) =>
          categoryTotals[category].descriptions.map((description) => ({
            label: description.description,
            value: description.amount,
          }))
        );

        setData1(outerData); // Set the outer pie chart data (by category)
        setData2(innerData); // Set the inner pie chart data (by description)
        setIsLoading(false); // Set loading to false after data is ready
      } catch (error) {
        console.error('Error fetching transactions:', error);
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>; // Show loading state while fetching data
  }

  return (
    <PieChart
      series={[
        {
          innerRadius: 100,
          outerRadius: 120,
          data: data2, // Inner pie chart for descriptions
        },
        {
          innerRadius: 0,
          outerRadius: 80,
          data: data1, // Outer pie chart for categories
        },
      ]}
      width={400}
      height={300}
      slotProps={{
        legend: { hidden: true },
      }}
    />
  );
}
