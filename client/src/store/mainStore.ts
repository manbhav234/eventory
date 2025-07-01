import { create } from 'zustand'
import { type LoginSlice, loginSlice } from './loginSlice';
import {type EventSlice, eventsSlice} from './eventsSlice'
import { type ProductSlice, productSlice } from './productSlice';
import { persist } from 'zustand/middleware'


export type AppState = LoginSlice & EventSlice & ProductSlice;

const useAppStore = create<AppState>()(persist((...a) => ({
    ...loginSlice(...a),
    ...eventsSlice(...a),
    ...productSlice(...a)
}),     
{
    name: "app-storage", 
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        user: state.user,
      }),
})
)

export default useAppStore;