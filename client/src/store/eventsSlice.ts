import type { StateCreator } from "zustand";
import axios from 'axios'
import type { AppState } from "./mainStore";
import { API_URL } from '../../constants';

export interface Tab {
    title: string,
    isActive: boolean
}

export interface EventSlice {
    events: Event[],
    error: string | null
    selectedEvent: number | null,
    currentEventDetails: () => Event | undefined,
    fetchEvents: () => Promise<void>,
    addEvent: (event:Event) => void,
    setCurrentEvent: (id: number) => void,
    sideTabs: Tab[],
    currentTab: Tab,
    setCurrentTab: (eventTitle: string) => void
}

export interface Event {
    id: number,
    eventName: string,
    startDate: Date,
    endDate: Date,
    managedBy: number
}

export const eventsSlice: StateCreator<AppState, [], [], EventSlice> = (set, get) => ({
    events: [] as Event[],
    selectedEvent: null,
    error: null,
    currentEventDetails: () => {
        const { events = [], selectedEvent } = get();
        return events.find((event) => event.id === selectedEvent);
    },
    fetchEvents: async () => {
        if (get().user){
            set({isLoading: true})
            try {
                const response = await axios.get(`${API_URL}/api/v1/events/fetchEvents`, {withCredentials: true});
                if (response.data.success){
                    set({events: response.data.events, isLoading: false});
                }
            }catch(e: any){
                set({error: e.message, isLoading: false})
            }
        }
    },
    addEvent: (event: Event) => set((state) => ({events: [...state.events, event]})),
    setCurrentEvent: async (id: number) => {
        get().fetchCategories();
        set(() => ({selectedEvent: id}));
        console.log("reached here")
        get().fetchProducts();
        get().fetchOrders();
    },
    sideTabs: [{title: "Dashboard", isActive: false}, {title: "Product List", isActive: false}, {title: "Add Products", isActive: false}, {title: "Create Order", isActive: false}, {title: "View Orders", isActive: false}],
    currentTab: {} as Tab,
    setCurrentTab: (eventTitle: string) => {
        const {sideTabs}  = get()
        const requiredTab = sideTabs.filter((event) => event.title === eventTitle)
        set({currentTab: {...requiredTab, title: eventTitle, isActive: true}})
        set({sideTabs: [...sideTabs.map((event)=>{
            if(event.title === eventTitle){
                return {...event, title: eventTitle, isActive: true}
            }else{
                return {...event, title: event.title, isActive: false}
            }
        })]})
    }
})