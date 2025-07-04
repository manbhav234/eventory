import { create } from 'zustand'
import { type LoginSlice, loginSlice } from './loginSlice';
import {type EventSlice, eventsSlice} from './eventsSlice'
import { type CategorySlice, categorySlice } from './categorySlice';
import {type ProductSlice, productSlice} from './productSlice';
import { type DashboardSlice, dashboardSlice } from './dashboardSlice';
import { persist } from 'zustand/middleware'
import { type OrderSlice, orderSlice } from './orderSlice';



export type AppState = LoginSlice & EventSlice & CategorySlice & ProductSlice & DashboardSlice & OrderSlice;

const persistOptions = {
    name: "app-storage", 
      partialize: (state: AppState) => ({
        isLoggedIn: state.isLoggedIn,
        user: state.user,
      }),
}

const useAppStore = create<AppState>()(persist((...a) => ({
    ...loginSlice(...a),
    ...eventsSlice(...a),
    ...categorySlice(...a),
    ...productSlice(...a),
    ...dashboardSlice(...a),
    ...orderSlice(...a)
}), persistOptions)
)

export default useAppStore;