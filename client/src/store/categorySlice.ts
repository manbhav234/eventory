import type { StateCreator } from "zustand";
import type { AppState } from "./mainStore";
import axios from "axios";

export interface Category {
    id: number,
    name: string,
    user: number
}

export interface CategorySlice {
    categories: Category[],
    fetchCategories: () => Promise<void>,
    addCategory: (categoryName: string) => Promise<void>
}

export const categorySlice: StateCreator<AppState, [], [], CategorySlice> = (set, get) => ({
    categories: [] as Category[],
    fetchCategories: async () => {
            try{
                console.log('fetching categories')
                const response = await axios.get('/api/v1/user/fetchCategories', {withCredentials: true});
                if (response.data.success){
                    set({categories: response.data.categories});
                }else{
                    set({categories: [] as Category[]})
                }
            }catch(e){
                console.log("Error occurred while fetching categories: ", e)
            }
    },
    addCategory: async (categoryName: string) => {
        try{
            if (categoryName.length >= 3){
                const response = await axios.post('/api/v1/user/addCategory', {
                    categoryName: categoryName
                }, {withCredentials: true});
                if (response.data.success){
                    console.log("category added successfully")
                    set({categories: [...get().categories, response.data.category]})
                }
            }
        }catch(e){
            console.log("Error occurred while adding category: ", e)
        }
    }
})