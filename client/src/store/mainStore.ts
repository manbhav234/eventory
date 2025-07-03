import { create } from 'zustand'
import { type LoginSlice, loginSlice } from './loginSlice';
import {type EventSlice, eventsSlice} from './eventsSlice'
import { type CategorySlice, categorySlice } from './categorySlice';
import {type ProductSlice, productSlice} from './productSlice';
import { persist } from 'zustand/middleware'



export type AppState = LoginSlice & EventSlice & CategorySlice & ProductSlice;

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
    ...productSlice(...a)
}), persistOptions)
)

export default useAppStore;