import { toast } from "sonner";
import { Invoice } from "@/types";
import { Button } from "@/components/ui/button";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Trash,
  Loader2,
  CopyPlus,
  Download,
  ArrowUpDown,
  MoreHorizontal,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useDeleteInvoice } from "@/services/hooks";

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
      <div className="font-semibold">{row.getValue("clientNumber")}</div>
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
      <div className="uppercase font-semibold">
        {row.getValue("referenceMonth")}
      </div>
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

      const formattedQuantity = quantity.toLocaleString("pt-BR");

      return (
        <div className="text-left font-medium">
          {formattedQuantity} KWh | {formattedPrice}
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

      const formattedQuantity = quantity.toLocaleString("pt-BR");

      return (
        <div className="text-left font-medium">
          {formattedQuantity} KWh | {formattedPrice}
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

      const formattedQuantity = quantity.toLocaleString("pt-BR");

      return (
        <div className="text-left font-medium">
          {formattedQuantity} KWh | {formattedPrice}
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
      const { deleteMutate, deletePending } = useDeleteInvoice();

      const handleCopyClientNumber = () => {
        navigator.clipboard.writeText(row.original.clientNumber);
        toast.success("Copied client number to clipboard! 📋🚀", {
          duration: 2500,
          className: "bg-green-300 text-gray-900 text-md",
        });
      };

      const handleDeleteInvoice = () => {
        deleteMutate(row.original.id);
      };

      const handleDownloadInvoice = () => {
        fetch(row.original.clientDocumentUrl)
          .then((response) => response.blob())
          .then((blob) => {
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "invoice.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            toast.success("Invoice downloaded successfully! 📄🚀", {
              duration: 2500,
              className: "bg-green-300 text-gray-900 text-md",
            });
          })
          .catch(() => {
            toast.error("Error downloading invoice! 😢", {
              duration: 2500,
              className: "bg-red-300 text-gray-900 text-md",
            });
          });
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-8 w-8 p-0 bg-black/10 hover:bg-black/20 rounded-full">
              <MoreHorizontal className="h-[1.2rem] w-[1.2rem] text-sky-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="text-md">Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={handleCopyClientNumber}>
              <CopyPlus className="h-4 w-4 mr-2" />
              Copy client number
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleDownloadInvoice}>
              <Download className="h-4 w-4 mr-2" />
              Download invoice
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              disabled={deletePending}
              className="text-red-400"
              onClick={handleDeleteInvoice}
            >
              {deletePending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Trash className="h-4 w-4 mr-2" />
              )}
              Delete invoice
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
