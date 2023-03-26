import { GrAdd, GrEdit, GrTrash } from "react-icons/gr";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  deleteCategory,
  getCategory,
  updateCategory,
} from "../../redux/CategorySlice";
import { IcategoryStateData } from "../../redux/CategorySlice";
import { AppDispatch, RootState } from "../../redux/Store";
import { toast } from "react-hot-toast";
import { AiOutlineUndo } from "react-icons/ai";

const Category = () => {
  const dispatch = useDispatch<AppDispatch>();
  const categoryData = useSelector((state: RootState) => state.category);
  const [userInput, setUserInput] = useState<string>("");
  const [newCategory, setNewCategory] = useState<boolean>(true);
  const [updateCategoryData, setUpdateCategoryData] =
    useState<IcategoryStateData>({ categoryName: "", id: "" });
  // function to dispatch create new category from toolkit thunk
  const handleCreateCategory = async (
    event: React.FormEvent<HTMLFormElement>,
    data: IcategoryStateData
  ) => {
    event.preventDefault();
    if (!userInput) return toast.error("Name cannot be empty");
    if (newCategory) {
      await dispatch(addCategory(userInput));
    } else {
      await dispatch(updateCategory({ categoryName: userInput, id: data.id }));
    }

    // empty the input field and update category data
    setUserInput("");
    setUpdateCategoryData({ categoryName: "", id: "" });
    setNewCategory(true);

    // dispatching the getCategory to update the slice data
    await dispatch(getCategory());
  };

  // function to dispatch delete category from toolkit thunk
  const handleDeleteCategory = async (id: string) => {
    if (!newCategory) {
      toast.error("Complete the update process before deletion");
      return;
    }
    if (
      window.confirm("Are you sure you want to delete the category?") === true
    ) {
      await dispatch(deleteCategory(id));
      // dispatching the getCategory to update the slice data
      await dispatch(getCategory());
    }
  };

  const handleUpdateCategory = (data: IcategoryStateData) => {
    setUserInput(data.categoryName);
    setNewCategory(false);
    setUpdateCategoryData({ ...data });
  };

  const handleDiscard = () => {
    setNewCategory(true);
    setUserInput("");
    setUpdateCategoryData({ categoryName: "", id: "" });
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
        <div className=" shadow-md rounded-md flex flex-col gap-4 items-center w-96 h-[75%] p-4 overflow-y-scroll">
          <form
            onSubmit={(event) =>
              handleCreateCategory(event, updateCategoryData)
            }
            className="rounded-3xl w-full flex items-center justify-between font-medium pl-4 shadow-md"
          >
            <input
              className="py-1"
              type="text"
              placeholder="New category name"
              value={userInput}
              onChange={(event) => setUserInput(event.target.value)}
            />
            <div className="h-full">
              {!newCategory && (
                <button
                  onClick={handleDiscard}
                  className="bg-yellow-500 hover:bg-yellow-400 transition-all ease-in-out duration-300 px-3 h-full text-white"
                >
                  <AiOutlineUndo />
                </button>
              )}
              <button
                type="submit"
                className="rounded-tr-3xl rounded-br-3xl bg-green-500 hover:bg-green-400 transition-all ease-in-out duration-300 text-white h-full w-10 pl-3"
              >
                <GrAdd />
              </button>
            </div>
          </form>

          {/* list of existing categories */}
          <ul className="w-full h-full space-y-3">
            {categoryData &&
              categoryData.map((element) => {
                return (
                  <li
                    key={element?.id}
                    className="flex items-center justify-between px-3 py-1 font-medium rounded-md shadow-md"
                  >
                    <p>{element?.categoryName}</p>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleUpdateCategory(element)}
                        className="bg-yellow-500 hover:bg-yellow-400 transition-all ease-in-out duration-300 px-3 py-2 rounded-md text-white "
                      >
                        <GrEdit />
                      </button>
                      <button className="bg-red-500 hover:bg-red-400 transition-all ease-in-out duration-300 px-3 py-2 rounded-md text-white">
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
