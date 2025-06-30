import { useParams } from "react-router-dom";
import DashboardSection from "./tabs/DashboardSection";
import ProductListSection from "./tabs/ProductListSection";
import AddProductsSection from "./tabs/AddProductsSection";
import OrdersSection from "./tabs/OrdersSection";
const SelectScreen = () => {
    const { selectedTab } = useParams();
    switch(selectedTab){
        case "dashboard":
            return <DashboardSection/>
        case "product list":
            return <ProductListSection/>
        case "add products":
            return <AddProductsSection/>
        case "orders":
            return <OrdersSection/>
        default:
            return <div>Nothing</div>
    }
}

export default SelectScreen;