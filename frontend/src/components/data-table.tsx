import * as React from "react";
import { Invoice } from "@/types";
import { columns } from "@/utils/columns";

import { Button } from "@/components/ui/button";
import { getUniqueClientNumbers } from "@/lib/utils";
import { useBulkDeleteInvoices } from "@/services/hooks";

import { TableSkeleton } from "@/components/skeletons/table-skeleton";

import {
  Trash,
  XIcon,
  Loader2,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

import {
  flexRender,
  SortingState,
  useReactTable,
  getCoreRowModel,
  VisibilityState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from "@/components/ui/table";

import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";

interface DataTableProps {
  data: Invoice[];
  isLoading: boolean;
}

export const DataTable = ({ data, isLoading }: DataTableProps) => {
  const { bulkDeleteMutate, bulkDeletePending } = useBulkDeleteInvoices();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: { pageSize: 5 },
      columnVisibility: { hiddenId: true },
    },
  });

  const isDisabled = !table.getFilteredSelectedRowModel().rows.length;

  const [selectedClientNumber, setSelectedClientNumber] = React.useState(
    (table?.getColumn("clientNumber")?.getFilterValue() as string) || ""
  );

  const handleSelectChange = (value: string) => {
    setSelectedClientNumber(value);
    table?.getColumn("clientNumber")?.setFilterValue(value);
  };

  const handleClear = () => {
    setSelectedClientNumber("");
    table?.getColumn("clientNumber")?.setFilterValue("");
  };

  const camelToTitleCase = (str: string) => {
    return str
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
  };

  const handleBulkDelete = () => {
    const ids = table
      .getFilteredSelectedRowModel()
      .rows.map((row) => row.original.id);

    bulkDeleteMutate(ids);
  };

  if (isLoading) return <TableSkeleton />;

  return (
    <div className="w-full">
      <h1 className="text-2xl font-semibold text-gray-200 text-center">
        Electric Data Library
      </h1>
      <div className="flex items-center py-4">
        <div className="flex items-center justify-center space-x-2">
          <Select
            value={selectedClientNumber}
            onValueChange={handleSelectChange}
          >
            <SelectTrigger className="w-[240px]" disabled={!data.length}>
              <SelectValue placeholder="All Clients" />
            </SelectTrigger>
            <SelectContent>
              {getUniqueClientNumbers(data).map((clientNumber) => (
                <SelectItem key={clientNumber} value={clientNumber}>
                  {clientNumber}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            onClick={handleClear}
            disabled={!selectedClientNumber}
            className="transition-all duration-500 w-[2.5rem] p-1 h-[2.5rem] rounded-full bg-sky-200"
          >
            <XIcon className="h-[1.4rem] w-[1.4rem] text-red-500" />
          </Button>
        </div>
        <div className="flex items-center justify-end w-full space-x-5">
          <Button
            className="space-x-1"
            variant="destructive"
            disabled={isDisabled || bulkDeletePending}
          >
            {bulkDeletePending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Trash className="h-4 w-4" />
            )}
            <span className="text-white/80" onClick={handleBulkDelete}>
              Delete {table.getFilteredSelectedRowModel().rows.length}{" "}
              invoice(s)
            </span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-sky-200">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {camelToTitleCase(column.id)}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="space-x-2">
              <Button
                variant="outline"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="rounded-full w-10 h-10 p-0 bg-sky-200"
              >
                <ArrowLeft className="h-[1.2rem] w-[1.2rem]" />
              </Button>
              <Button
                variant="outline"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="rounded-full w-10 h-10 p-0 bg-sky-200"
              >
                <ArrowRight className="h-[1.2rem] w-[1.2rem]" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      {!!data.length && (
        <p className="text-gray-200/80 text-end text-sm font-semibold">
          Total invoices:{" "}
          <span className="text-gray-200">
            {table.getFilteredRowModel().rows.length}
          </span>
        </p>
      )}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-white/50">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-gray-900">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="bg-white/30"
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="text-gray-900 text-[1rem]"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="bg-white/30">
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No data available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
