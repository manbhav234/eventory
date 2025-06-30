import { NavMain } from "./nav-main"
import { NavEvents } from "./nav-events"
import { NavUser } from "./nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "../ui/sidebar"
import { ThemeToggleBtn } from "../ThemeToggleBtn"
import useAppStore from "@/store/mainStore"
import { useEffect } from "react"
import Loader from "../Loader"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {user, fetchEvents, events, isLoading, selectedEvent, sideTabs} = useAppStore();

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents])

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        {selectedEvent && <NavMain items={sideTabs} />}
        {isLoading ? 
        <div className="w-full h-full flex justify-center items-center">
          <Loader/> 
        </div>
        : <NavEvents events={events!} />}
      </SidebarContent>
      <SidebarFooter>
        <ThemeToggleBtn/>
        <NavUser user={user!} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
