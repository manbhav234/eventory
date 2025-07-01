const EventTitleBar = ({eventName}: {eventName: string | undefined}) => {
    return (
        <div className="border-b border-b-gray-500 flex justify-center items-center w-full py-2 mx-2 my-2">
            <span className="text-center text-4xl font-extrabold">{eventName}</span>
        </div>
    )
}

export default EventTitleBar;