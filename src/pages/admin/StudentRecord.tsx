import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { IinitialStateUserData } from "../../config/interfaces";
import { AppDispatch, RootState } from "../../redux/Store";
import { toast } from "react-hot-toast";
import { getUsersData } from "../../redux/UserSlice";
import Loader from "../../components/Loader/Loader";

const StudentsRecord = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: orgUsers, isLoading: userLoading } = useSelector(
    (state: RootState) => state.user
  );
  const [filteredUsers, setFilteredUsers] = useState([...orgUsers]);
  const [searchByName, setSearchByName] = useState<string>("");

  // for handling pagination
  const [usersToBeDisplayed, setUsersToBeDisplayed] =
    useState<IinitialStateUserData[]>();
  const userLimit = 5;
  const [currentPage, setCurrentPage] = useState(1);
  let startIndex = (currentPage - 1) * userLimit;
  let endIndex =
    startIndex + userLimit > filteredUsers.length
      ? filteredUsers.length
      : startIndex + userLimit;

  // function to update the questions to be displayed
  const setUser = () => {
    setUsersToBeDisplayed([]);
    const data = [];
    for (let i = startIndex; i < endIndex; i++) {
      data.push(filteredUsers[i]);
    }
    setUsersToBeDisplayed([...data]);
  };

  // function to handle the pagination next button click
  const handlePaginationNextButtonClick = () => {
    // checking for the last page
    if (currentPage * userLimit >= filteredUsers.length) {
      return;
    }
    setCurrentPage(currentPage + 1);
    setUser();
  };

  // function to handle the pagination previous button click
  const handlePaginationPreviousButtonClick = () => {
    // checking for the first page
    if (currentPage === 1) {
      return;
    }
    setCurrentPage(currentPage - 1);
    setUser();
  };

  // function to handle search question by name functionality
  const searchUserByName = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!searchByName) {
      setFilteredUsers([...orgUsers]);
      setCurrentPage(1);
      return;
    }
    const data = orgUsers.filter((element) => {
      const userName = element?.name.toLowerCase();
      const inputName = searchByName.toLowerCase().trim();
      return userName.includes(inputName);
    });
    setFilteredUsers([...data]);
    setCurrentPage(1);
    toast.success("Empty search will return all users");
  };

  // for updating the start and end index to fetch recent data
  useEffect(() => {
    startIndex = (currentPage - 1) * userLimit;
    endIndex =
      startIndex + userLimit > filteredUsers.length
        ? filteredUsers.length
        : startIndex + userLimit;
    setUser();
  }, [currentPage, filteredUsers]);

  // for getting question and category data on first render
  useEffect(() => {
    (async () => {
      await dispatch(getUsersData());
    })();
    setFilteredUsers([...orgUsers]);
    setUser();
  }, []);

  useEffect(() => {
    setFilteredUsers([...orgUsers]);
  }, [orgUsers]);

  return userLoading ? (
    <Loader />
  ) : (
    <div className="flex flex-col items-center justify-center text-center w-full min-h-screen ml-60">
      <div className="w-[70%] space-y-10">
        <header className="space-y-2 text-center">
          <h2 className="text-4xl font-bold">
            Welcome to the{" "}
            <span className="text-[#00C8AC]">Student Record</span>
          </h2>
          <p className="font-semibold">
            It is a list of all the registered user on our platform
          </p>
        </header>

        <div className="shadow-lg p-2 rounded-md w-full flex flex-col gap-5">
          {/* to search the student using its name */}
          <form
            onSubmit={searchUserByName}
            className="border border-gray-500 rounded-3xl px-4 py-1 font-medium flex items-center justify-between"
          >
            <input
              className="w-full"
              type="text"
              placeholder="Search student by name"
              value={searchByName}
              onChange={(event) => setSearchByName(event.target.value)}
            />
            <button
              type="submit"
              className="text-2xl font-bold transition-all ease-in-out duration-300 hover:text-[#00C8AC]"
            >
              <AiOutlineSearch />
            </button>
          </form>

          {/* table to display the users */}
          <table className="overflow-x-auto w-full object-fill">
            <thead className="bg-gray-200">
              <tr className="align-text-top">
                <th className="p-1 border border-r-gray-600 border-b-gray-600 border-l-gray-600">
                  S No.
                </th>
                <th className="p-1 border border-r-gray-600 border-b-gray-600">
                  Name
                </th>
                <th className="p-1 border border-r-gray-600 border-b-gray-600">
                  Email
                </th>
                <th className="p-1 border border-r-gray-600 border-b-gray-600">
                  Role
                </th>
                <th className="p-1 border border-r-gray-600 border-b-gray-600">
                  Quiz Attempted
                </th>
                <th className="p-1 border border-r-gray-600 border-b-gray-600">
                  Passed
                </th>
                <th className="p-1 border border-r-gray-600 border-b-gray-600">
                  Failed
                </th>
              </tr>
            </thead>

            <tbody>
              {usersToBeDisplayed &&
                usersToBeDisplayed.map((element, index) => {
                  if (!element) {
                    return;
                  }
                  return (
                    <tr
                      key={index}
                      className="align-text-top border border-gray-600 font-medium"
                    >
                      <td className="p-1 text-center border border-r-gray-600 border-b-gray-600 border-l-gray-600">
                        {index + 1}
                      </td>
                      <td className="p-1 text-center border border-r-gray-600 border-b-gray-600">
                        {element?.name}
                      </td>
                      <td className="p-1 text-center border border-r-gray-600 border-b-gray-600">
                        {element?.email}
                      </td>
                      <td className="p-1 text-center border border-r-gray-600 border-b-gray-600">
                        {element?.role.length === 1 ? "User" : "Admin"}
                      </td>
                      <td className="p-1 text-center border border-r-gray-600 border-b-gray-600">
                        {element?.quizAttempted}
                      </td>
                      <td className="p-1 text-center border border-r-gray-600 border-b-gray-600">
                        {element?.passed}
                      </td>
                      <td className="p-1 text-center border border-r-gray-600 border-b-gray-600">
                        {element?.failed}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        {/* for displaying the pagination options */}
        <footer className="flex items-center justify-between shadow-md font-semibold mt-5 rounded-md p-3">
          <p>
            Showing {filteredUsers.length === 0 ? 0 : startIndex + 1} to{" "}
            {endIndex} of {filteredUsers.length} results
          </p>

          {/* buttons for next and previous */}
          <div className="space-x-4">
            <button
              onClick={handlePaginationPreviousButtonClick}
              className="border-[1.5px] border-[#00C8AC] rounded-sm px-4 py-1 transition-all ease-in-out duration-300 hover:shadow-[0_0_5px_#00C8AC]"
            >
              Previous
            </button>
            <button
              onClick={handlePaginationNextButtonClick}
              className="border-[1.5px] border-[#00C8AC] rounded-sm px-4 py-1 transition-all ease-in-out duration-300 hover:shadow-[0_0_5px_#00C8AC]"
            >
              Next
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default StudentsRecord;
