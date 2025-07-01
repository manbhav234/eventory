import EventTitleBar from "@/components/EventTitleBar";
import useAppStore from "@/store/mainStore";
import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";

const Dashboard: React.FC = () => {
    const {eventId} = useParams()
    const {setCurrentEvent, currentEventDetails, isLoading} = useAppStore();
    useEffect(()=>{
        setCurrentEvent(Number(eventId));
    }, [setCurrentEvent, eventId])
    const currentEvent = currentEventDetails();
    if (isLoading){
      return (
        <></>
      )
    }
    return (
        <div className="flex flex-col w-[90%] items-center">
          {currentEvent ?
            <>
            <EventTitleBar eventName={currentEvent?.eventName}/>
              <div className="w-full h-full mx-4">
                <Outlet/>
              </div>
            </>  : <p className="my-auto text-3xl">No Such Event Exists</p>
          }
        </div>
    )
}

export default Dashboard;