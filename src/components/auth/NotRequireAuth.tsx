import { Navigate, Outlet } from "react-router-dom";
import useLoggedIn from "../../hook/useLoggedIn";

const NotRequireAuth = () => {
  const isLoggedIn = useLoggedIn();
  return isLoggedIn ? <Navigate to={"/"} replace /> : <Outlet />;
};

export default NotRequireAuth;
