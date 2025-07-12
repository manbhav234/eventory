import { useParams } from "react-router-dom";
import DashboardSection from "./tabs/DashboardSection";
import ProductListSection from "./tabs/ProductListSection";
import AddProductsSection from "./tabs/AddProductsSection";
import CreateOrderSection from "./tabs/CreateOrderSection";
import ViewOrderSection from "./tabs/ViewOrderSection";
const SelectScreen = () => {
    const { selectedTab } = useParams();
    switch(selectedTab){
        case "dashboard":
            return <DashboardSection/>
        case "product list":
            return <ProductListSection/>
        case "add products":
            return <AddProductsSection/>
        case "create order":
            return <CreateOrderSection/>
        case "view orders":
            return <ViewOrderSection/>
        default:
            return <DashboardSection/>
    }
}

export default SelectScreen;