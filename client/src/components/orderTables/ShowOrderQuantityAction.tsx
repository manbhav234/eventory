import useAppStore from "@/store/mainStore";
import { Button } from "../ui/button"
import { Plus, Minus } from "lucide-react"
import { useState } from "react";

const ShowOrderQuantityAction = ({row} : {row: any}) => {
        const {products, updateProductQuantity} = useAppStore();
        const currentProduct = products.filter((product) => product.id == row.getValue('id'))[0]
        const [quantity, setQuantity] = useState(1);
        const onClick = (adjustment: number) => {
            const newQuantity = Math.max(1, Math.min(currentProduct.quantity, quantity + adjustment))
            updateProductQuantity(currentProduct.id, newQuantity);
            setQuantity(newQuantity);
        }
      return (
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-6 w-6 shrink-0 rounded-full"
                onClick={() => onClick(-1)}
                disabled={quantity <= 1}
              >
                <Minus />
                <span className="sr-only">Decrease</span>
              </Button>
              <div className="flex-1 text-center">
                <div className="text-lg font-bold tracking-tighter">
                  {quantity}
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-6 w-6 shrink-0 rounded-full"
                onClick={() => onClick(1)}
                disabled={quantity >= currentProduct.quantity}
              >
                <Plus />
                <span className="sr-only">Increase</span>
              </Button>
            </div>
      )
}

export default ShowOrderQuantityAction;