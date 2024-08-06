import * as React from "react";
import { Invoice } from "@/types";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  ArrowLeft,
  ArrowRight,
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  XIcon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface DataTableProps {
  data: Invoice[];
}

export const columns: ColumnDef<Invoice>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "clientNumber",
    header: "Client",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("clientNumber")}</div>
    ),
  },
  {
    accessorKey: "referenceMonth",
    header: ({ column }) => {
      return (
        <button
          className="p-0 flex items-center justify-center space-x-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Month/Year
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => (
      <div className="uppercase">{row.getValue("referenceMonth")}</div>
    ),
  },
  {
    accessorKey: "eletricEnergy",
    header: () => <div className="text-left">Elec. Energy</div>,
    cell: ({ row }) => {
      const quantity = row.original.electricEnergyQuantity;
      const price = row.original.electricEnergyPrice;

      const formattedPrice = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(price);

      return (
        <div className="text-left font-medium">
          {quantity} KWh - {formattedPrice}
        </div>
      );
    },
  },
  {
    accessorKey: "sceeEnergy",
    header: () => <div className="text-left">SCEE. Energy W/O ICMS </div>,
    cell: ({ row }) => {
      const quantity = row.original.sceeeEnergyQuantityWithoutIcms;
      const price = row.original.sceeeEnergyPriceWithoutIcms;

      const formattedPrice = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(price);

      return (
        <div className="text-left font-medium">
          {quantity} KWh - {formattedPrice}
        </div>
      );
    },
  },
  {
    accessorKey: "compensatedEnergy",
    header: () => <div className="text-left">Compen. Energy</div>,
    cell: ({ row }) => {
      const quantity = row.original.compensatedEnergyQuantity;
      const price = row.original.compensatedEnergyPrice;

      const formattedPrice = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(price);

      return (
        <div className="text-left font-medium">
          {quantity} KWh - {formattedPrice}
        </div>
      );
    },
  },
  {
    accessorKey: "publicEnergy",
    header: () => <div className="text-left">Public Energy</div>,
    cell: ({ row }) => {
      const price = row.original.municipalPublicLightingPrice;

      const formattedPrice = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(price);

      return <div className="text-left font-medium">{formattedPrice}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const handleCopyClientNumber = () => {
        navigator.clipboard.writeText(row.original.clientNumber);
        toast("Copied client number to clipboard! 📋🚀", { duration: 2500 });
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={handleCopyClientNumber}>
              Copy client number
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Download invoice</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const DataTable = ({ data }: DataTableProps) => {
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
    },
  });

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

  const uniqueClientNumbers = Array.from(
    new Set(data.map((invoice) => invoice.clientNumber))
  );

  const camelToTitleCase = (str: string) => {
    return str
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
  };

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
            <SelectTrigger className="w-[240px]">
              <SelectValue placeholder="Client Number" />
            </SelectTrigger>
            <SelectContent>
              {uniqueClientNumbers.map((clientNumber) => (
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
            className="transition-all duration-500"
          >
            <XIcon className="h-[1.4rem] w-[1.4rem] text-red-500" />
          </Button>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
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
      </div>
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-white/80 ">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
