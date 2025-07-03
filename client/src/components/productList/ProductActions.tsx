// ProductActions.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { MoreHorizontal, Trash } from "lucide-react";
import useAppStore from "@/store/mainStore";

export const ProductActions = ({ row }: { row: any }) => {
  const [open, setOpen] = useState(false);
  const {deleteProduct} = useAppStore()
  const handleProductDelete = async () => {
      console.log("Deleting product", row.original.id);
      await deleteProduct(row.getValue("id"));
      setOpen(false);
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="flex justify-center items-center">
            <span>Update Product</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              setOpen(true);
            }}
          >
            <Trash className="h-4 w-4 text-red-500 mr-2" />
            <span className="text-red-500">Delete Product</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the product <span className="text-red-500">{row.getValue("name")}</span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => {setOpen(false)}}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleProductDelete}
            >
              Delete Product
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
