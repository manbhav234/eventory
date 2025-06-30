import type React from "react";
import useAppStore from "../store/mainStore";
import { useNavigate } from "react-router-dom";
const LogoutBtn: React.FC = () => {
    const {logoutUser} = useAppStore();
    const navigate = useNavigate();
    const handleLogout = async () => {
        await logoutUser();
        navigate('/')
    }
    return (
        <button onClick={handleLogout} className="w-24 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:bg-white dark:text-black dark:hover:bg-gray-200">
            Logout
        </button>
    )
}
export default LogoutBtn;