import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/Store";
import { useEffect } from "react";
import { getUserData } from "../../redux/AuthSlice";
import useAuth from "../../hooks/useAuth";
import Loader from "../../components/Loader/Loader";

const Profile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, email, failed, name, passed, quizAttempted, role } =
    useSelector((state: RootState) => state.auth);
  const { uid, isLoggedIn } = useAuth();
  useEffect(() => {
    if (isLoggedIn && uid) {
      (async () => {
        await dispatch(getUserData(uid));
      })();
    }
  }, [isLoggedIn]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="h-screen w-full flex items-center justify-center ml-60">
      {/* card for displaying the user profile */}
      <div className="shadow-md rounded-md flex flex-col gap-4 items-center w-fit p-4">
        <h1 className="text-2xl font-bold">{name}</h1>
        <div className="w-full grid grid-cols-2 font-medium gap-3">
          <h3>Email : </h3>
          <p>{email}</p>

          <h3>Role : </h3>
          <p>{role.join(" and ")}</p>

          <h3>Total Attempt : </h3>
          <p>{quizAttempted}</p>

          <h3>Passed : </h3>
          <p>{passed}</p>

          <h3>Failed : </h3>
          <p>{failed}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
