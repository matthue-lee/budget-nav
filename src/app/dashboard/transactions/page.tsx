'use client'
import React from 'react'
import TableComponent from '../../components/TableComponent'; // Make sure to import your TableComponent

export default function page() {
  return (
    <div className="h-screen flex p-8 max-w-lg">
      {/* Left half for the table */}
        <div className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden p-2 border-8 border-secondary">
          <h1 className="text-2xl font-bold p-4 border-b">Transactions</h1>
          <div className="flex-1 overflow-y-auto">
            <TableComponent />
          </div>
        </div>
    </div>
  )
}
