import type { StateCreator } from "zustand";
import type { AppState } from "./mainStore";
import type { Product } from "./productSlice";
import axios from "axios";

export interface OrderItem {
    productName: string, 
    quantity: number,
    productCost: number
}

export interface Order {
    id: number, 
    totalAmount: number,
    orderDate: string,
    paymentMode: 'CASH' | 'UPI',
    orderItems: OrderItem[]
}

export interface OrderSlice {
    selectedProducts: Product[],
    addSelectedRow: (product: Product) => void,
    deleteSelectedRow: (productId: number) => void,
    updateProductQuantity: (productId: number, quantity: number) => void,
    clearSelectedProducts: () => void,
    createdOrders: Order[],
    addNewOrder: (orderDetails: Order) => void,
    updateStockOnOrderCreation: () => void,
    fetchOrders: () => Promise<void>
}


export const orderSlice: StateCreator<AppState, [], [], OrderSlice> = (set, get) => ({
    selectedProducts: [] as Product[],
    addSelectedRow: (product: Product) => set((state) => ({
        selectedProducts: [...state.selectedProducts, product]
    })),
    deleteSelectedRow: (productId: number) => set((state) => ({
        selectedProducts: state.selectedProducts.filter((presentProduct) => productId != presentProduct.id)
    })),
    updateProductQuantity: (productId: number, quantity: number) => set((state) => ({
        selectedProducts: state.selectedProducts.map((product) => productId == product.id ? {...product, quantity: quantity} : product)
    })),
    clearSelectedProducts: () => {
        set({selectedProducts: []})
    },
    createdOrders: [] as Order[],
    addNewOrder: (orderDetails: Order) => set((state) => ({
        createdOrders: [...state.createdOrders, orderDetails]
    })),
    updateStockOnOrderCreation: () => {
        const selectedProductsMap = new Map(
            get().selectedProducts.map((p) => [p.id, p.quantity])
        );  
        const updatedProducts = get().products.map((product) => {
        const updatedQuantity = selectedProductsMap.get(product.id);
        return updatedQuantity !== undefined
            ? { ...product, quantity: product.quantity - updatedQuantity }
            : product;
        })
        set({products: updatedProducts});
    },
    fetchOrders: async () => {
        try {
            const response = await axios.get(`/api/v1/orders/fetchOrders?eventId=${get().selectedEvent}`, {withCredentials: true});
            if (response.data.success){
                const finalOrders = response.data.orders.map((order) => ({...order, orderDate: new Date(order.orderDate).toLocaleDateString("en-GB", {
                    timeZone: "Asia/Kolkata",
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                })}));
                set({createdOrders: finalOrders});
            }
            console.log(get().createdOrders);
        }catch(e){
            console.log("Error fetching orders: ", e)
        }
    }
})