import { AppSidebar } from "@/components/sidebar/app-sidebar"
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { Outlet } from "react-router-dom";

const MainPage: React.FC = () => {
    return (
      <SidebarProvider>
          <AppSidebar/>
          <SidebarTrigger />
        <Outlet/>
      </SidebarProvider>
    )
}

export default MainPage;