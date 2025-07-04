import { type ColumnDef } from "@tanstack/react-table"
import { Button } from "../ui/button"
import { ArrowUpDown } from "lucide-react"
//TODO: convert this type and other types to zod schemas later
export type OrderTableCol = {
  id: number
  orderDate: string
  totalAmount: number
  paymentMode:  "CASH" | "UPI"
}
export const viewOrderColumns: ColumnDef<OrderTableCol>[] = [
  {
    accessorKey: "id",
    header: () => <span className="flex justify-center items center">Order ID</span>,
    cell: ({row}) => {
      return (
        <div className="flex justify-center items-center">
          {row.getValue("id")}
        </div>
      )
    }
  },
  {
    accessorKey: "orderDate",
    header: () => <span className="flex justify-center items-center">Order Date</span>,
    cell: ({row}) => {
      return (
        <div className="flex justify-center items-center">
          {row.getValue("orderDate")}
        </div>
      )
    }
  },
  {
    accessorKey: "totalAmount",
    header: ({ column }) => {
      return (
        <div className="flex justify-center items-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Total Amount
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({row}) => {
      return (
        <div className="flex justify-center items-center">
          ₹{row.getValue("totalAmount")}
        </div>
      )
    }
  },
  {
    accessorKey: "paymentMode",
    header: () => <span className="flex justify-center items-center">Payment Mode</span>,
    cell: ({row}) => {
      return (
        <div className="flex justify-center items-center">
          {row.getValue("paymentMode")}
        </div>
      )
    }
  },

]