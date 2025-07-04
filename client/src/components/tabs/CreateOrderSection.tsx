import { Button } from "@/components/ui/button";
import { CreateOrderTable } from "../orderTables/CreateOrderTable";
import { createOrderColumns } from "../orderTables/CreateOrderColumns";
import useAppStore from "@/store/mainStore";
import { showOrderColumns } from "../orderTables/ShowOrderColumns";
import { ShowOrderTable } from "../orderTables/ShowOrderTable";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import AlertBox from "../AlertBox";
import { useState } from "react";
import {
  type SortingState,
  getCoreRowModel,
  type ColumnFiltersState,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import axios from "axios";

const CreateOrderSection = () => {

    const {products, clearSelectedProducts, selectedProducts, selectedEvent, addNewOrder, updateStockOnOrderCreation} = useAppStore();
    const [paymentMode, setPaymentMode] = useState("CASH");
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [message, setMessage] = useState("");
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [error, setError] = useState(false)
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 5
    });


  const createOrderTable = useReactTable({
    data: products,
    columns: createOrderColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
      sorting,
      columnFilters
    },
  })

  const onSubmit = async () => {
    setMessage("")
    setDisableSubmit(true);
    setError(false);
    console.log(paymentMode);
    console.log(selectedProducts);
    const data = {
        totalAmount: selectedProducts.reduce((total, product) => total + (product.sellingPrice * product.quantity), 0),
        products: selectedProducts,
        paymentMode,
        eventId: selectedEvent
    }
    const response = await axios.post('/api/v1/orders/createOrder', data, {withCredentials: true});
    if (response.data.success){
        setMessage(response.data.message);
        updateStockOnOrderCreation();
        createOrderTable.resetRowSelection();
        setDisableSubmit(false)
        const orderDetails = {
            totalAmount: data.totalAmount,
            id: response.data.order.id,
            orderDate: new Date(response.data.order.orderDate).toLocaleDateString("en-GB", {
                timeZone: "Asia/Kolkata",
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            }),
            paymentMode: data.paymentMode,
            orderItems: data.products.map(({name, quantity, costPrice, ...rest}) => ({productName: name, quantity: quantity, productCost: costPrice}))
        }
        console.log(orderDetails)
        addNewOrder(orderDetails)
    }else{
        setError(true);
        setMessage(response.data.message);
    }
    clearSelectedProducts();
  };

  const clearOrderDetails = () => {
    createOrderTable.resetRowSelection();
    clearSelectedProducts()
  }

  return (
    <div className="w-full h-[100%] flex justify-center">
      <div className="w-full h-full">
        <div className="grid grid-cols-2 h-[10%]">
          <div>
            <h1 className="text-3xl font-bold">Create Order</h1>
          </div>
          <div className="justify-self-end place-self-start mt-2 flex flex-col gap-y-2 md:flex-row justify-center items-center md:mr-8">
            <Button
              type="button"
              onClick={clearOrderDetails}
              className="mx-2 w-full mr-4 justify-self-end place-self-center md:mx-4"
            >
              Clear Order
            </Button>
          </div>
          {message ? <div className="col-span-2 mt-2 md:justify-self-center md:w-1/2"><AlertBox error={error} title={message}/></div> : null}
        </div>
        <p className="text-xl font-bold mt-6">Available Stock</p>
        <CreateOrderTable columns={createOrderColumns} data={products} table={createOrderTable}/>
        <p className="mt-4 text-xl font-bold">Selected Products</p>
        <ShowOrderTable columns={showOrderColumns} data={selectedProducts}/>
        <div className="grid grid-cols-1 md:flex md:justify-between items-center gap-4 mt-4 pb-4">
            <div className="flex justify-between md:justify-start items-center gap-4">
                <span className="md:text-xl font-bold">Select Payment Method : </span>
                <ToggleGroup type="single" className="gap-2" defaultValue="CASH">
                    <ToggleGroupItem value="CASH" onClick={()=>{setPaymentMode("CASH")}}>Cash</ToggleGroupItem>
                    <ToggleGroupItem value="UPI" onClick={()=>{setPaymentMode("UPI")}}>UPI</ToggleGroupItem>
                </ToggleGroup>
            </div>
            <div className="flex justify-between items-center gap-4">
                <span className="md:text-xl font-bold">Total Amount : ₹{selectedProducts.length == 0 ? 0 : selectedProducts.reduce((totalAmount, product) => totalAmount + (product.sellingPrice * product.quantity), 0)}</span>
                <Button
                type="submit"
                form="addProductForm"
                className="md:mr-6"
                onClick={onSubmit}
                disabled={selectedProducts.length == 0 || disableSubmit}
                >
                Confirm Order
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
};
export default CreateOrderSection;
