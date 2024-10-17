import dynamic from 'next/dynamic';
const ChartThree = dynamic(() => import('../../components/ChartThree'), { ssr: false });

const BudgetPage = () => {
  return (
    <div className="mt-3 ml-4 bg-gray-100">

      {/* Render ChartThree */}
      <ChartThree />
      
      {/* Add other components or content below */}
    </div>
  );
};

export default BudgetPage;
