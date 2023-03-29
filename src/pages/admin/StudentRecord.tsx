import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useSelector } from "react-redux";
import { IinitialStateUser } from "../../config/interfaces";
import { RootState } from "../../redux/Store";

const StudentsRecord = () => {
  const orgUsers = useSelector((state: RootState) => state.user);
  const [filteredUsers, setFilteredUsers] = useState([...orgUsers]);
  const [searchText, setSearchText] = useState("");

  // for handling pagination
  const [indexStart, setIndexStart] = useState<number>(0);
  const [indexEnd, setIndexEnd] = useState<number>(5);
  const [usersToBeDisplayed, setUsersToBeDisplayed] =
    useState<IinitialStateUser[]>();

  // function to handle the search functionality
  const handleSearch = () => {
    if (!searchText) {
      setFilteredUsers([...orgUsers]);
    } else {
      const newUserData = orgUsers.filter((element) => {
        return element.email.includes(searchText);
      });
      setFilteredUsers(newUserData);
    }
  };

  // function to handle pagination
  const handlePagination = () => {
    const newData = [];
    for (let i = indexStart; i < indexEnd; i++) {
      newData.push(filteredUsers[i]);
    }
    setUsersToBeDisplayed([...newData]);
  };

  const handlePaginationNextBtn = () => {
    if (indexEnd === filteredUsers.length) {
      return;
    } else if (indexEnd + 5 >= filteredUsers.length) {
      setIndexStart(indexEnd);
      setIndexEnd(filteredUsers.length);
    } else {
      setIndexStart(indexEnd);
      setIndexEnd(indexEnd + 5);
    }
  };

  const handlePaginationPreviousBtn = () => {
    if (indexStart === 0) {
      return;
    } else if (indexEnd % 5 !== 0 && indexStart - 5 >= 0) {
      setIndexEnd(indexEnd - (indexEnd % 5));
      setIndexStart(indexStart - 5);
    } else if (indexStart - 5 >= 0) {
      setIndexEnd(indexStart);
      setIndexStart(indexStart - 5);
    }
  };

  // for managing the pagination
  useEffect(() => {
    handlePagination();
  }, [indexStart, indexEnd, filteredUsers]);

  return (
    <div className="flex flex-col items-center justify-center text-center w-full min-h-[100vh] ml-60">
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
          <div className="border border-gray-500 rounded-3xl px-4 py-1 font-medium flex items-center justify-between">
            <input
              className="w-full"
              type="text"
              placeholder="Search student by email id"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />
            <button
              onClick={handleSearch}
              className="text-2xl font-bold transition-all ease-in-out duration-300 hover:text-[#00C8AC]"
            >
              <AiOutlineSearch />
            </button>
          </div>

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
                        {element?.role.join(" and ")}
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
            Showing {indexStart + 1} to {indexEnd} of {filteredUsers.length}{" "}
            results
          </p>

          {/* buttons for next and previous */}
          <div className="space-x-4">
            <button
              onClick={handlePaginationPreviousBtn}
              className="border-[1.5px] border-[#00C8AC] rounded-sm px-4 py-1 transition-all ease-in-out duration-300 hover:shadow-[0_0_5px_#00C8AC]"
            >
              Previous
            </button>
            <button
              onClick={handlePaginationNextBtn}
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
