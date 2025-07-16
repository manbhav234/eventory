// ProductActions.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { MoreHorizontal, Trash } from "lucide-react";
import useAppStore from "@/store/mainStore";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export const ProductActions = ({ row }: { row: any }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [quantity, setQuantity] = useState(row.getValue('quantity'));
  const {deleteProduct, updateProduct} = useAppStore()

  const handleProductDelete = async () => {
      console.log("Deleting product", row.original.id);
      await deleteProduct(row.getValue("id"));
      setOpenDelete(false);
  }

  const handleProductUpdate = async () => {
    console.log("updating the product")
    await updateProduct(row.getValue("id"), quantity);
    setOpenUpdate(false);
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
          <DropdownMenuItem className="flex justify-center items-center"
             onSelect={() => {
              setOpenUpdate(true);
            }}
          >
            <span>Update Product</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              setOpenDelete(true);
            }}
          >
            <Trash className="h-4 w-4 text-red-500 mr-2" />
            <span className="text-red-500">Delete Product</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={openDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the product <span className="text-red-500">{row.getValue("name")}</span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => {setOpenDelete(false)}}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleProductDelete}
            >
              Delete Product
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>


      <AlertDialog open={openUpdate}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Update Product</AlertDialogTitle>
            <AlertDialogDescription>
              <Label className="my-2">
                Enter New Quantity
              </Label>
              <Input type="number" min={0} placeholder="Enter New Quantity" value={quantity} onChange={(e) => {setQuantity(e.target.value)}}/>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => {setOpenUpdate(false)}}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleProductUpdate}
            >
              Update Product
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </>
  );
};
