import type { StateCreator } from "zustand";
import axios from 'axios'
import type { AppState } from "./mainStore";
export interface User {
    id: number, 
    name: string, 
    email: string
}

export interface LoginSlice {
    isLoggedIn: boolean,
    error: string | null,
    user: User | null,
    isLoading: boolean
    checkLogin: () => Promise<void>,
    logoutUser: () => Promise<void>
}

export const loginSlice: StateCreator<AppState, [], [], LoginSlice> = (set) => ({
    isLoggedIn: false,
    error: null,
    user: null,
    isLoading: true,
    checkLogin: async () => {
        set({isLoading: true})
        try {
            const response = await axios.get('/api/v1/auth/checkLogin', {withCredentials: true});
            if (response.data.success){
                set({isLoggedIn: true, user: response.data.user, error: null, isLoading: false});
            }
        }catch(e){
            set({isLoggedIn: false, error: e.message, user: null})
        }finally{
            set({isLoading: false})
        }
    },
    logoutUser: async () => {
        set({isLoading: true})
        try{
            const response = await axios.get('/api/v1/auth/logout', {withCredentials: true});
            if (response.data.success){
                set({isLoggedIn: false, error: null, user: null})
            }
        }catch(e){
            set({isLoggedIn: false, error: e.message, user: null})
        }finally{
            set({isLoading: false})
            localStorage.removeItem("app-storage")
        }
    }
})
