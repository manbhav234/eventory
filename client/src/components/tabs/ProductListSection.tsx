import useAppStore from "@/store/mainStore";
import { ProductDataTable } from "../productList/ProductDataTable";
import {columns} from '@/components/productList/ProductListColumns'
import { Loader } from "lucide-react";
import { useEffect } from "react";
const ProductListSection = () => {

    const {products} = useAppStore();

    return (
        <div className="w-full h-full flex justify-center mt-4">
            <div className="w-full">
                <div className="mb-8 flex justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Product List</h1>
                        <p className="mt-2 text-gray-600">View and Manage Products</p>
                    </div>
                </div>
                <ProductDataTable columns={columns} data={products}/>
            </div>
        </div>
    )
}
export default ProductListSection;