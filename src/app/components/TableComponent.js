'use client'; // Mark this as a client component

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Spinner,
} from "@nextui-org/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon, ChevronDownIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useAsyncList } from "@react-stately/data";
import { columns } from "../../data/columns.js"; // Ensure this imports correctly
import { capitalize } from "./utils.js"; // Ensure your capitalize function is imported correctly

export default function App() {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));

  // Infinite loading logic using useAsyncList for transactions
  const list = useAsyncList({
    async load({ signal, cursor }) {
      const response = await fetch("/api/transactions", { signal });
      const transactions = await response.json();
      const start = cursor ? parseInt(cursor, 10) : 0;
      const end = start + 10;
      const newItems = transactions.slice(start, end);

      return {
        items: newItems.map((item, index) => ({
          ...item,
          key: `${item.id || item.date}-${index}`,
        })),
        cursor: end < transactions.length ? String(end) : null,
      };
    },
    async sort({ items, sortDescriptor }) {
      return {
        items: items.sort((a, b) => {
          let first = a[sortDescriptor.column];
          let second = b[sortDescriptor.column];

          // Convert to numbers if possible, otherwise leave as string comparison
          first = isNaN(first) ? first : parseInt(first);
          second = isNaN(second) ? second : parseInt(second);

          let cmp = first < second ? -1 : first > second ? 1 : 0;
          if (sortDescriptor.direction === "descending") {
            cmp *= -1;
          }

          return cmp;
        }),
      };
    },
  });

  // Handle search filtering
  const filteredItems = React.useMemo(() => {
    let filteredTransactions = [...list.items];
    if (filterValue) {
      filteredTransactions = filteredTransactions.filter((transaction) =>
        transaction.description.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    return filteredTransactions;
  }, [list.items, filterValue]);

  // Render table cells for each column dynamically
  const renderCell = (transaction, columnKey) => {
    const cellValue = transaction[columnKey];
    switch (columnKey) {
      case "date":
        return transaction.date;
      case "description":
        return transaction.description;
      case "amount":
        return `$${transaction.amount.toFixed(2)}`;
      case "category":
        return transaction.category;
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <EllipsisVerticalIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>View</DropdownItem>
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  };

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
  }, []);

  const onSortChange = (sortDescriptor) => {
    list.sort({ sortDescriptor });
  };

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by description..."
            startContent={<MagnifyingGlassIcon style={{ width: '16px', height: '16px' }} />}
            value={filterValue}
            onClear={onClear}
            onValueChange={onSearchChange}
          />
          <Button color="primary" endContent={<PlusIcon />}>
            Add New
          </Button>
        </div>
      </div>
    );
  }, [filterValue, onSearchChange, onClear]);

  // Detect scrolling and trigger loading more items
  const onScroll = React.useCallback(
    (event) => {
      const { scrollTop, scrollHeight, clientHeight } = event.target;
      if (scrollHeight - scrollTop === clientHeight) {
        list.loadMore();
      }
    },
    [list]
  );

  return (
    <div onScroll={onScroll} style={{ overflowY: "auto", maxHeight: "600px" }}>
      <Table
        aria-label="Transactions Table with infinite scrolling"
        isHeaderSticky
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[382px]",
        }}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        sortDescriptor={list.sortDescriptor} // Sorting descriptor to pass current sorting state
        onSortChange={onSortChange} // Sorting event handler
      >
        <TableHeader>
          {columns.map((column) => (
            <TableColumn key={column.uid} allowsSorting={column.sortable}>
              {column.name}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody items={filteredItems}>
          {(item) => (
            <TableRow key={item.key}>
              {columns.map((column) => (
                <TableCell key={column.uid}>
                  {renderCell(item, column.uid)}
                </TableCell>
              ))}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {list.loading && <Spinner label="Loading more transactions..." />}
    </div>
  );
}
