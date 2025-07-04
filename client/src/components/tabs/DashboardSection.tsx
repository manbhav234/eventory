import useAppStore from "@/store/mainStore";
import SectionCard from "../dashboard/SectionCard";
//TODO: fetch values from the state
const DashboardSection = () => {

    const {totalInventoryValue, totalRevenue, grossProfit, netProfit, totalOrders, costOfGoodsSold, averageOrderValue, maxOrderValue, cashOrders, cashAmount, upiOrders, upiAmount} = useAppStore();
    return (
        <div className="flex flex-col justify-center mb-6">
            <p className="ml-6 mt-2 text-2xl font-bold">Sales Statistics</p>
            <div className="w-full grid sm:grid-cols-1 md:grid-cols-4 gap-3 mt-6 px-4">
                <SectionCard title="Cost Of Goods Sold" value={costOfGoodsSold()}/>
                <SectionCard title="Total Revenue" value={totalRevenue()}/>
                <SectionCard title="Gross Profit" value={grossProfit()}/>
                <SectionCard title="Net Profit" value={netProfit()}/>
            </div>
            <p className="ml-6 mt-4 text-2xl font-bold">Payment Statistics</p>
            <div className="w-full grid sm:grid-cols-1 md:grid-cols-4 gap-3 mt-6 px-4">
                <SectionCard title="Total Cash Orders" value={cashOrders()}/>
                <SectionCard title="Total Cash Amount" value={cashAmount()}/>
                <SectionCard title="Total UPI Orders" value={upiOrders()}/>
                <SectionCard title="Total UPI Amount" value={upiAmount()}/>
            </div>
            <p className="ml-6 mt-4 text-2xl font-bold">Other Statistics</p>
            <div className="w-full grid sm:grid-cols-1 md:grid-cols-4 gap-3 mt-6 px-4">
                <SectionCard title="Available Inventory Value" value={totalInventoryValue()}/>
                <SectionCard title="Total Orders" value={totalOrders()}/>
                <SectionCard title="Average Order Value" value={averageOrderValue()}/>
                <SectionCard title="Max Order Value" value={maxOrderValue()}/>
            </div>
        </div>
    )
}
export default DashboardSection;