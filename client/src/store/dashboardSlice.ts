import type { StateCreator } from "zustand";
import type { AppState } from "./mainStore";

export interface DashboardSlice {
    totalInventoryValue: () => number,
    grossProfit: () => number,
    netProfit: () => number,
    totalRevenue: () => number,
    totalOrders: () => number,
    costOfGoodsSold: () => number,
    averageOrderValue: () => number,
    maxOrderValue: () => number,
    cashOrders: () => number,
    upiOrders: () => number,
    cashAmount: () => number,
    upiAmount: () => number
}


export const dashboardSlice: StateCreator<AppState, [], [], DashboardSlice> = (_set, get) => ({
    totalInventoryValue: () => {
        const products = get().products;
        return products.reduce((total, product) => (product.costPrice * product.quantity) + total, 0);
    },
    costOfGoodsSold: () => {
        const allOrders = get().createdOrders;
        return allOrders.reduce((cogs, order) => cogs + order.orderItems.reduce((totalCost, orderItem) => totalCost + (orderItem.productCost * orderItem.quantity), 0), 0)
    },
    totalRevenue: () => {
        const allOrders = get().createdOrders;
        return allOrders.reduce((revenue, order) => revenue + order.totalAmount, 0);
    },
    grossProfit: () => {
        return get().totalRevenue() - get().costOfGoodsSold()
    },
    totalOrders: () => {
        return get().createdOrders.length
    },
    netProfit: () => {
        return get().grossProfit() - get().totalInventoryValue();
    },
    averageOrderValue: () => {
        const orders = get().totalOrders();
        return orders == 0 ? 0 : get().totalRevenue() / orders
    },
    maxOrderValue: () => {
        const maxValue = get().createdOrders.length == 0 ? 0 : Math.max(...get().createdOrders.map((order) => order.totalAmount))
        return maxValue
    },
    cashOrders: () => {
        return get().createdOrders.reduce((total, order) => order.paymentMode == 'CASH' ? total + 1: total, 0)
    },
    upiOrders: () => {
        return get().createdOrders.reduce((total, order) => order.paymentMode == 'UPI' ? total + 1: total, 0)
    },
    cashAmount: () => {
        return get().createdOrders.reduce((total, order) => order.paymentMode == 'CASH' ? total + order.totalAmount: total, 0)
    },
    upiAmount: () => {
        return get().createdOrders.reduce((total, order) => order.paymentMode == 'UPI' ? total + order.totalAmount: total, 0)
    }
})