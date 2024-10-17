import dynamic from 'next/dynamic';
import { Card, CardHeader, CardBody, Divider } from '@nextui-org/react';

// Dynamically import ChartOne (to ensure it's rendered client-side only)
const ChartOne = dynamic(() => import('../../components/ChartOne'), { ssr: false });

const DashboardPage = () => {
  return (
    <div className="h-screen flex flex-col w-full">
      {/* Top section - Reduced vertical height */}
      <div className="flex-grow-0 h-1/4 grid grid-cols-1 gap-4 p-4 w-full md:grid-cols-2 xl:grid-cols-3">
        {/* Example cards */}
        <Card className="w-full bg-secondary">
          <CardHeader>
            <h4 className="text-lg font-bold">Card 1</h4>
          </CardHeader>
          <Divider />
          <CardBody>
            <p>Content for Card 1 goes here.</p>
          </CardBody>
        </Card>

        <Card className="w-full bg-secondary">
          <CardHeader>
            <h4 className="text-lg font-bold">Card 2</h4>
          </CardHeader>
          <Divider />
          <CardBody>
            <p>Content for Card 2 goes here.</p>
          </CardBody>
        </Card>

        {/* Add more cards here if needed */}
      </div>

      {/* Bottom section - Chart with 2/3 width and 1/2 height */}
      <div className="flex-grow h-1/2 flex justify-start items-center p-4">
        {/* Card with chart takes 2/3 of the width and full height, left-aligned */}
        <Card className="h-full w-2/3 bg-secondary">
          <CardHeader>
            <h4 className="text-lg font-bold">Payments Overview</h4>
          </CardHeader>
          <Divider />
          <CardBody className="h-full">
            <ChartOne />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
