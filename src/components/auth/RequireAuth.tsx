import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useLoggedIn from "../../hook/useLoggedIn";
import { RootState } from "../../redux/Store";

interface Iprops {
  allowedRoles: string[];
}

const RequireAuth = ({ allowedRoles }: Iprops) => {
  const location = useLocation();
  const isLoggedIn = useLoggedIn();
  const userRole = useSelector((state: RootState) => state.auth.role);
  return isLoggedIn && userRole.find((role) => allowedRoles.includes(role)) ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default RequireAuth;