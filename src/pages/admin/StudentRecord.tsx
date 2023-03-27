import { AiOutlineSearch } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";

const StudentsRecord = () => {
  return (
    <div className="flex justify-center">
      <div className="py-6 w-[60%] relative">
        <header className="space-y-2 text-center">
          <h2 className="text-4xl font-bold">
            Welcome to the{" "}
            <span className="text-[#00C8AC]">Student Record</span>
          </h2>
          <p className="font-semibold">
            It is a list of all the registered user on our platform
          </p>

          {/* to search the student using its name */}
          <div className="border border-gray-500 rounded-3xl px-4 py-1 font-medium flex items-center justify-between">
            <input
              className="w-full"
              type="text"
              placeholder="Search student"
            />
            <button className="text-2xl font-bold">
              <AiOutlineSearch />
            </button>
          </div>
        </header>

        {/* table to display the users */}
        <div className="w-full p-2 border border-gray-500 mt-5 rounded-md">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th>S No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Quiz Attempted</th>
                <th>Passed</th>
                <th>Failed</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>1</td>
                <td>Vinay</td>
                <td>vinay@ineuron.ai</td>
                <td>
                  <BsTrash />
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Vinay</td>
                <td>vinay@ineuron.ai</td>
                <td>
                  <BsTrash />
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>Vinay</td>
                <td>vinay@ineuron.ai</td>
                <td>
                  <BsTrash />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentsRecord;
