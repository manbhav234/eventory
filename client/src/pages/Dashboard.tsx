import EventTitleBar from "@/components/EventTitleBar";
import useAppStore from "@/store/mainStore";
import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";

const Dashboard: React.FC = () => {
    const {eventId} = useParams()
    const {setCurrentEvent, currentEventDetails} = useAppStore();
    useEffect(()=>{
        setCurrentEvent(Number(eventId))
    }, [setCurrentEvent, eventId])
    const currentEvent = currentEventDetails();
    return (
        <div className="flex flex-col w-full items-center">
          <EventTitleBar eventName={currentEvent?.eventName}/>
          <div>
            <Outlet/>
          </div>
        </div>
    )
}

export default Dashboard;