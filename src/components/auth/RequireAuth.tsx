import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { RootState } from "../../redux/Store";

interface Iprops {
  allowedRoles: string[];
}

const RequireAuth = ({ allowedRoles }: Iprops) => {
  const location = useLocation();
  const isLoggedIn = useAuth();
  const userRole = useSelector((state: RootState) => state.auth.role);
  return isLoggedIn && userRole.find((role) => allowedRoles.includes(role)) ? (
    <Outlet />
  ) : isLoggedIn ? (
    <Navigate to={"/denied"} state={{ from: location }} replace />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default RequireAuth;
