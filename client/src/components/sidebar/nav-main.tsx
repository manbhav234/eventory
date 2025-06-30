import useAppStore from "@/store/mainStore"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar"
import type { Tab } from "@/store/eventsSlice"
import { useNavigate } from "react-router-dom"
export function NavMain({
  items,
}: {
  items: Tab[]
}) {
  const {setCurrentTab, selectedEvent} = useAppStore()
  const navigate = useNavigate();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Eventory</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
            <SidebarMenuItem key={item.title} onClick={() => {setCurrentTab(item.title);navigate(`/main/event/${selectedEvent}/${item.title.toLowerCase()}`)}}>
                <SidebarMenuButton tooltip={item.title}>
                  <span>{item.title}</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
