'use client';
import React, { useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner, Dropdown, Button } from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";

// Helper function to sort numbers and strings
function compareValues(a, b, sortDescriptor) {
  let first = a[sortDescriptor.column];
  let second = b[sortDescriptor.column];

  if (typeof first === 'string') {
    first = first.toLowerCase();
    second = second.toLowerCase();
  }

  let cmp = first < second ? -1 : first > second ? 1 : 0;

  if (sortDescriptor.direction === 'descending') {
    cmp *= -1;
  }

  return cmp;
}

const categories = ["Groceries", "Utilities", "Entertainment", "Dining", "Rent", "Transportation"];

export default function TableComponent() {
  const [selectedTransaction, setSelectedTransaction] = useState(null); // Track selected transaction
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  // UseAsyncList to load and sort data
  let list = useAsyncList({
    async load({ signal }) {
      let res = await fetch('/api/transactions', { signal });
      let json = await res.json();

      // Add a unique `key` field to each transaction
      let itemsWithKey = json.map((item, index) => ({
        ...item,
        key: `${item.date}-${item.description}-${index}`, // Use date, description, and index to create a unique key
      }));

      setData(itemsWithKey); // Store loaded data
      setIsLoading(false);

      return {
        items: itemsWithKey, // Return the transactions with the unique key
      };
    },
    async sort({ items, sortDescriptor }) {
      return {
        items: items.sort((a, b) => compareValues(a, b, sortDescriptor)),
      };
    },
  });

  // Handle category change
  const handleCategoryChange = async (transactionId, newCategory) => {
    try {
      // Update the local data
      const updatedData = data.map((item) =>
        item.key === transactionId ? { ...item, category: newCategory } : item
      );
      setData(updatedData);

      // Send the updated category to the backend API
      await fetch('/api/update-category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transactionId, newCategory }),
      });
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  // Handle edit action
  const handleEdit = (transaction) => {
    console.log("Edit clicked for transaction:", transaction);
    // Add your edit logic here (e.g., open a modal or make inline editing possible)
  };

  const renderActionsCell = (item) => {
    return (
      <Dropdown>
        <Dropdown.Trigger>
          <Button isIconOnly size="sm" variant="light">
            •••
          </Button>
        </Dropdown.Trigger>
        <Dropdown.Menu aria-label="Actions">
          <Dropdown.Item onPress={() => handleEdit(item)}>Edit</Dropdown.Item>
          <Dropdown.Item>View</Dropdown.Item>
          <Dropdown.Item>Delete</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  return (
    <Table
      removeWrapper
      isHeaderSticky
      aria-label="Transactions Table with Client-side Sorting, Editable Category, and Actions"
      sortDescriptor={list.sortDescriptor}
      onSortChange={list.sort}
      classNames={{
        table: "min-h-[400px]",
      }}
      isStriped
      selectionMode="single" // Enable row selection
      onSelectionChange={(keys) => {
        const selectedKey = Array.from(keys)[0];
        const selected = data.find((item) => item.key === selectedKey);
        setSelectedTransaction(selected); // Set the selected transaction
      }}
    >
      <TableHeader>
        <TableColumn key="date" allowsSorting>Date</TableColumn>
        <TableColumn key="description" allowsSorting>Description</TableColumn>
        <TableColumn key="amount" allowsSorting>Amount</TableColumn>
        <TableColumn key="category" allowsSorting>Category</TableColumn>
        <TableColumn key="actions">Actions</TableColumn> {/* Add Actions Column */}
      </TableHeader>
      <TableBody
        items={list.items}
        isLoading={isLoading}
        loadingContent={<Spinner label="Loading..." />}
      >
        {(item) => (
          <TableRow key={item.key} className="text-xs">
            <TableCell>{item.date}</TableCell>        {/* JSON field */}
            <TableCell>{item.description}</TableCell> {/* JSON field */}
            <TableCell>{item.amount}</TableCell>      {/* JSON field */}
            <TableCell>{item.category}</TableCell>    {/* JSON field */}
            <TableCell>{renderActionsCell(item)}</TableCell> {/* Dynamically generated actions */}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
