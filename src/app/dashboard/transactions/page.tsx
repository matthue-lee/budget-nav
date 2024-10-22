'use client'
import React from 'react'
import TableComponent from '../../components/TableComponent'; // Make sure to import your TableComponent

export default function page() {
  return (
    <div className="h-screen flex p-8 justify-items-center">
      {/* Left half for the table */}
        <div className="flex bg-white rounded-lg shadow-lg overflow-hidden p-2 ml-10 border-8 border-secondary justify-center">
          <div className="flex-1 overflow-y-auto">
            <TableComponent />
          </div>
        </div>
    </div>
  )
}
