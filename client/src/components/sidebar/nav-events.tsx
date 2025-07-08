import {
  Folder,
  MoreHorizontal,
  Trash2,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar"
import type { Event } from "@/store/eventsSlice"
import { IconPlus } from '@tabler/icons-react';
import { useNavigate } from "react-router-dom";
import useAppStore from "@/store/mainStore";
export function NavEvents({
  events
}: {
  events: Event[]
}) {
  const { isMobile } = useSidebar()
  const navigate = useNavigate();
  const {setCurrentEvent} = useAppStore();
  const setSelectedEvent = (id: number) => {
    setCurrentEvent(id);
    navigate(`/main/event/${id}`)
  }

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="text-sm">Events</SidebarGroupLabel>
      <SidebarMenu>
        { events.map((item) => (
          <SidebarMenuItem key={item.id}>
            <SidebarMenuButton asChild>
              <span>{item.eventName}</span>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem className="hover:cursor-pointer" onClick={()=>{setSelectedEvent(item.id)}}>
                  <Folder className="text-muted-foreground" />
                  <span>Manage Event</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Trash2 className="text-muted-foreground" />
                  <span>Delete Project</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem className="border-2 border-dotted rounded-md hover:cursor-pointer" onClick={()=>{console.log('reached create event click btn');navigate('/main/createEvent')}}>
          <SidebarMenuButton asChild>
              <div className="flex justify-between items-center">
                <span>Create an Event</span>
                <IconPlus stroke={2} />
              </div>
          </SidebarMenuButton>  
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
