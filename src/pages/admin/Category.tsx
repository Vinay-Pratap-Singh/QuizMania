import { GrAdd, GrEdit, GrTrash } from "react-icons/gr";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  deleteCategory,
  getCategory,
} from "../../redux/CategorySlice";
import { AppDispatch, RootState } from "../../redux/Store";
import { toast } from "react-hot-toast";

const Category = () => {
  const dispatch = useDispatch<AppDispatch>();

  const categoryData = useSelector((state: RootState) => state.category);

  const [userInput, setUserInput] = useState<string>("");

  // function to dispatch create new category from toolkit thunk
  const handleCreateCategory = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!userInput) return toast.error("Name cannot be empty");
    await dispatch(addCategory(userInput));

    // empty the input field
    setUserInput("");

    // dispatching the getCategory to update the slice data
    dispatch(getCategory());
  };

  // function to dispatch delete category from toolkit thunk
  const handleDeleteCategory = async (id: string) => {
    await dispatch(deleteCategory(id));

    // dispatching the getCategory to update the slice data
    await dispatch(getCategory());
  };

  // for getting the category data on page render
  useEffect(() => {
    dispatch(getCategory());
  }, []);

  return (
    <div className="h-[100vh] w-full flex items-center justify-center ml-60">
      <div className="flex flex-col gap-10 items-center h-[80%] w-full">
        <header className="text-center w-full space-y-2">
          <h2 className="text-4xl font-bold relative">
            Welcome to the <span className="text-[#00C8AC]">Category Page</span>
          </h2>
          <p>
            Select the category name carefully because the name will be stored
            as it is in the database without any change
          </p>
        </header>

        {/* card for category */}
        <div className=" shadow-md rounded-md flex flex-col gap-4 items-center w-96 h-[75%] p-4">
          <form
            onSubmit={handleCreateCategory}
            className="border border-gray-500 rounded-3xl w-full flex items-center justify-between font-medium pl-4"
          >
            <input
              className="py-1"
              type="text"
              placeholder="New category name"
              value={userInput}
              onChange={(event) => setUserInput(event.target.value)}
            />
            <button
              type="submit"
              className="rounded-tr-3xl rounded-br-3xl bg-[#00C8AC] h-full w-10 pl-3"
            >
              <GrAdd />
            </button>
          </form>

          {/* list of existing categories */}
          <ul className="border border-gray-500 rounded-sm w-full h-full">
            {categoryData &&
              categoryData.map((element) => {
                return (
                  <li
                    key={element?.id}
                    className="flex items-center justify-between px-3 py-1 font-medium"
                  >
                    <p>{element?.categoryName}</p>
                    <div className="flex items-center gap-3">
                      <button>
                        <GrEdit />
                      </button>
                      <button>
                        <GrTrash
                          onClick={() => handleDeleteCategory(element?.id)}
                        />
                      </button>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Category;
