import { GrAdd, GrEdit, GrTrash } from "react-icons/gr";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCategory } from "../../redux/CategorySlice";
import { AppDispatch } from "../../redux/Store";

const Category = () => {
  const dispath = useDispatch<AppDispatch>();

  const [userInput, setUserInput] = useState<string>("");

  const createNewCategory = () => {
    dispath(addCategory(userInput));
    console.log("working");
  };

  return (
    <div className="h-[100vh] w-full flex items-center justify-center">
      <div className="flex flex-col gap-10 items-center h-[80%]">
        <h2 className="text-4xl font-bold relative">
          Welcome to the <span className="text-[#00C8AC]">Category Page</span>
        </h2>

        <div className=" shadow-md rounded-md flex flex-col gap-4 items-center w-96 h-[75%] p-4">
          <header className="border border-gray-500 rounded-3xl w-full flex items-center justify-between font-medium pl-4">
            <input
              className="py-1"
              type="text"
              placeholder="New category name"
              value={userInput}
              onChange={(event) => setUserInput(event.target.value)}
            />
            <button
              onClick={createNewCategory}
              className="rounded-tr-3xl rounded-br-3xl bg-[#00C8AC] h-full w-10 pl-3"
            >
              <GrAdd />
            </button>
          </header>

          {/* list of existing categories */}
          <ul className="border border-gray-500 rounded-sm w-full h-full">
            <li className="flex items-center justify-between px-3 py-1 font-medium">
              <p>HTML</p>
              <div className="flex items-center gap-3">
                <button>
                  <GrEdit />
                </button>
                <button>
                  <GrTrash />
                </button>
              </div>
            </li>
            <li className="flex items-center justify-between px-3 py-1 font-medium">
              <p>CSS</p>
              <div className="flex items-center gap-3">
                <button>
                  <GrEdit />
                </button>
                <button>
                  <GrTrash />
                </button>
              </div>
            </li>
            <li className="flex items-center justify-between px-3 py-1 font-medium">
              <p>JavaScript</p>
              <div className="flex items-center gap-3">
                <button>
                  <GrEdit />
                </button>
                <button>
                  <GrTrash />
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Category;
