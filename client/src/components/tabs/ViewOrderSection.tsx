import { ViewOrderTable } from "../orderTables/ViewOrderTable"
import { viewOrderColumns } from "../orderTables/ViewOrderColumns"
import useAppStore from "@/store/mainStore"

const ViewOrderSection = () => {
    const {createdOrders} = useAppStore();
    return (
        <div className="w-full h-full flex justify-center mt-4">
            <div className="w-full">
                <div className="mb-8 flex justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Orders</h1>
                        <p className="mt-2 text-gray-600">View your Orders</p>
                    </div>
                </div>
                <ViewOrderTable columns={viewOrderColumns} data={createdOrders}/>
            </div>
        </div>
    )
}

export default ViewOrderSection