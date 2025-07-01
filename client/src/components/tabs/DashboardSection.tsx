import SectionCard from "../dashboard/SectionCard";
//TODO: fetch values from the state
const DashboardSection = () => {
    return (
        <div className="w-full grid grid-rows-4 md:grid-cols-4 gap-3 mt-6 px-4">
            <SectionCard title="Total Expenditure" value={10000}/>
            <SectionCard title="Total Sales" value={20000}/>
            <SectionCard title="Profit" value={10000}/>
            <SectionCard title="Total Orders" value={20}/>
        </div>
    )
}
export default DashboardSection;