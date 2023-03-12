import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCategory } from "../redux/CategorySlice";
import { AppDispatch, RootState } from "../redux/Store";

const QuizStarterPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // for holding user preference
  const [userPreference, setUserPreference] = useState({
    length: "",
    category: "",
  });

  // getting all the categories list
  const categoryList = useSelector((state: RootState) => state.category);

  // function to handle form submit
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // checking for the empty fields
    if (!userPreference.length || !userPreference.category) {
      toast.error("All fields are mandatory");
      return;
    }

    navigate("/quiz", { state: { ...userPreference } });
  };

  // function to handle the input changes
  const handleInputChange = (event: React.FormEvent<HTMLSelectElement>) => {
    const { name, value } = event.currentTarget;
    setUserPreference({ ...userPreference, [name]: value });
  };

  // for getting the categories from database
  useEffect(() => {
    (async () => {
      await dispatch(getCategory());
    })();
  }, []);

  return (
    <div className="min-h-[100vh] w-full flex items-center justify-center ml-60">
      {/* creating the starter card */}
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col items-center justify-center p-10 space-y-5 rounded-lg shadow-md"
      >
        <h1 className="text-4xl font-bold drop-shadow-md">
          Welcome to the <span className="text-[#00C8AC]">Quiz</span>
        </h1>
        <p className="font-semibold">Customize the quiz before moving ahead</p>

        {/* adding the options for user */}
        <div className="flex flex-col items-center space-y-10">
          <div className="grid grid-cols-2 gap-3">
            {/* adding the quiz length option */}
            <div className="font-semibold">
              <label
                className="text-[#00C8AC] font-bold text-lg"
                htmlFor="length"
              >
                Quiz Length :{" "}
              </label>
              <select
                className="text-sm"
                name="length"
                id="length"
                required
                onChange={handleInputChange}
              >
                <option value="">Choose Me</option>
                <option value="5">Short (5 Q)</option>
                <option value="10">Medium (10 Q)</option>
              </select>
            </div>

            {/* adding the category topics */}
            <div className="font-semibold">
              <label
                className="text-[#00C8AC] font-bold text-lg"
                htmlFor="category"
              >
                Category :{" "}
              </label>
              <select
                className="text-sm"
                name="category"
                id="category"
                required
                onChange={handleInputChange}
              >
                <option value="">Choose Me</option>
                {categoryList.map((element) => {
                  return (
                    <option key={element.id} value={element?.categoryName}>
                      {element?.categoryName}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          {/* adding the button */}
          <button
            type="submit"
            className="border-2 border-[#00C8AC] px-4 py-1 rounded-md font-bold text-xl bg-[#00C8AC] text-white transition-all ease-in-out duration-300 hover:shadow-[0_0_5px_#00C8AC]"
          >
            Start the Skill Battle
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuizStarterPage;
