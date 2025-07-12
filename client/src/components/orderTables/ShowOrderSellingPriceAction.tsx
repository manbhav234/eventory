import { useState } from "react";
import { Input } from "../ui/input";
import useAppStore from "@/store/mainStore";

const ShowOrderSellingPriceAction = ({row}: {row: any}) => {
    const [sellingPrice, setSellingPrice] = useState(row.getValue('sellingPrice'));
    const {products, updateProductSellingPrice} = useAppStore();
    const currentProduct = products.filter((product) => product.id == row.getValue('id'))[0]
    const handleChange = (e: any) => {
        setSellingPrice(e.target.value);
        updateProductSellingPrice(currentProduct.id, e.target.value);
    }
    return (
        <Input type="number" min={0} placeholder="Enter Selling Price" value={sellingPrice} onChange={handleChange}/>
    )
}
export default ShowOrderSellingPriceAction;