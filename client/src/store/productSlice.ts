import { type StateCreator } from "zustand";
import type { AppState } from "./mainStore";
import axios from 'axios'
import { API_URL } from '../../constants';

export interface ProductVariant {
    variantType: string, 
    variantValue: string,
    variantCostPrice: number,
    variantSellingPrice: number,
    variantQuantity: number
}

export interface Product{
  id: number,
  image: string,
  name: string,
  quantity: number,
  costPrice: number,
  sellingPrice: number,
  stockStatus: "OUT OF STOCK" | "IN STOCK" | "RUNNING LOW" 
}

export interface ProductSlice {
    products: Product[],
    fetchProducts: () => Promise<void>,
    addProduct: (product: any) => void,
    deleteProduct: (productId: number) => Promise<void>,
}


export const productSlice: StateCreator<AppState, [], [], ProductSlice> = (set, get) => ({
    products: [] as Product[],
    fetchProducts: async () => {
        console.log("fetching products")
        set({isLoading: true});
        try {
            const response = await axios.get(`${API_URL}/api/v1/products/fetchProducts?eventId=${get().selectedEvent}`, {withCredentials: true});
            if (response.data.success){
                set({products: response.data.products, isLoading: false});
            }
        }catch(e){
            console.log("Error occurred: ", e);
            set({isLoading: false});
        }
    },
    addProduct: (product) => set((state) => {
        const quantity = product.quantity
        let status = "OUT OF STOCK"
        if (quantity <= 3){
            status = "RUNNING LOW"
        }else{
            status = "IN STOCK"
        }
        return {
            products: [...state.products, {...product, stockStatus: status}]
        }
    }),
    deleteProduct: async (productId: number) => {
        const response = await axios.put(`${API_URL}/api/v1/products/deleteProduct`, {id: productId}, {withCredentials: true});
        if (response.data.success){
            set({products: get().products.filter((product) => product.id != productId)});
        }
    },
})

