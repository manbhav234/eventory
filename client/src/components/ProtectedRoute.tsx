import { Navigate, Outlet } from "react-router-dom";
import useAppStore from "@/store/mainStore";

const ProtectedRoute = () => {
  const isLoggedIn = useAppStore((state) => state.isLoggedIn);

  return isLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;