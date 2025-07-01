import type { StateCreator } from "zustand";
import type { AppState } from "./mainStore";

export interface DashboardSlice {
    totalExpenditure: number,
    totalProfit: number,
    totalRevenue: number,
    totalOrders: number
}


export const eventsSlice: StateCreator<AppState, [], [], DashboardSlice> = (set, get) => ({
    totalExpenditure: 0,
    totalRevenue: 0,
    totalProfit: 0,
    totalOrders: 0,
    
})