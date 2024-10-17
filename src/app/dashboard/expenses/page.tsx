'use client';
import React from 'react';
import TableComponent from '../../components/TableComponent'; // Make sure to import your TableComponent

export default function Page() {
  return (
    <div>
    <div className="h-screen flex p-8 max-w-lg">
      {/* Left half for the table */}
        <div className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden p-2 border-8 border-secondary">
          <h1 className="text-2xl font-bold p-4 border-b">Transactions</h1>
          <div className="flex-1 overflow-y-auto">
            <TableComponent />
          </div>
        </div>
    </div>
      
    <div className="absolute top-8 right-8 w-1/4 h-1/2 bg-white rounded-lg shadow-lg p-4 border-4 border-secondary">
        <h1 className="text-xl font-bold p-4 border-b">Top Right Card</h1>
        <div className="flex-1 p-4">
          <p>Content for the top right card goes here.</p>
        </div>
      </div>
      <div className="absolute bottom-8 right-8 w-1/4 h-1/3 bg-white rounded-lg shadow-lg p-4 border-4 border-secondary">
        <h1 className="text-xl font-bold p-4 border-b">Top Right Card</h1>
        <div className="flex-1 p-4">
          <p>Content for the top right card goes here.</p>
        </div>
      </div>

    </div>
  );
}
