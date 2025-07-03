import { type ColumnDef } from "@tanstack/react-table"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { IconPhotoScan } from '@tabler/icons-react';
import { Badge } from "../ui/badge";
import { ProductActions } from "./ProductActions";
import { ArrowUpDown } from "lucide-react"
import { Button } from "../ui/button";

//TODO: convert this type and other types to zod schemas later
export type ProductTableCol = {
  id: number
  image: string
  name: string
  stockStatus:  "OUT OF STOCK" | "IN STOCK" | "RUNNING LOW"
  quantity: number
  costPrice: number
  sellingPrice: number
}
export const columns: ColumnDef<ProductTableCol>[] = [
  {
    accessorKey: "id",
    header: () => <span className="flex justify-center items center">Product ID</span>,
    cell: ({row}) => {
      return (
        <div className="flex justify-center items-center">
          {row.getValue("id")}
        </div>
      )
    }
  },
  {
    accessorKey: "image",
    header: () => <span className="flex justify-center items-center">Product Image</span>,
    cell: ({row}) => {
      console.log(row.getValue("image"))
      return (
        <div className="flex justify-center items-center">
          <Avatar>
            <AvatarImage src={row.getValue("image")} alt="@shadcn" width={64} height={64}/>
            <AvatarFallback><IconPhotoScan stroke={2} size={64}/></AvatarFallback>
          </Avatar>
        </div>
      )
    }
  },
  {
    accessorKey: "name",
    header: () => <span className="flex justify-center items-center">Product Name</span>,
    cell: ({row}) => {
      return (
        <div className="flex justify-center items-center">
          {row.getValue("name")}
        </div>
      )
    }

  },
  {
    accessorKey: "stockStatus",
    header: () => <span className="flex justify-center items-center">Stock Status</span>,
    cell: ({row}) => {
      const stockStatus = row.getValue("stockStatus");

      let status = "IN STOCK";
      let color = "bg-green-100 text-green-800";

      if (stockStatus == "OUT OF STOCK") {
        status = "OUT OF STOCK";
        color = "bg-red-100 text-red-800";
      } else if (stockStatus == "RUNNING LOW") {
        status = "RUNNING LOW";
        color = "bg-yellow-100 text-yellow-800";
      }

      return (
        <div className="flex justify-center items-center">
          <Badge className={`${color} px-3 py-1 rounded-full font-medium`}>
            {status}
          </Badge>
        </div>
      );
    }
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return (
        <div className="flex justify-center items-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Quantity
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({row}) => {
      return (
        <div className="flex justify-center items-center">
          {row.getValue("quantity")}
        </div>
      )
    }
  },
  {
    accessorKey: "costPrice",
    header: ({ column }) => {
      return (
        <div className="flex justify-center items-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Cost Price
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({row}) => {
      return (
        <div className="flex justify-center items-center">
          ₹{row.getValue("costPrice")}
        </div>
      )
    }
  },
  {
    accessorKey: "sellingPrice",
    header: ({ column }) => {
      return (
        <div className="flex justify-center items-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Selling Price
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({row}) => {
      return (
        <div className="flex justify-center items-center">
          ₹{row.getValue("sellingPrice")}
        </div>
      )
    }
  },
  {
    id: "actions",
    cell: ({row}) => <ProductActions row={row}/>

  },
]