import { DocumentSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ImyQuestionData } from "../../config/interfaces";
import { getCategory } from "../../redux/CategorySlice";
import { deleteQuestion, getQuestions } from "../../redux/QuizSlice";
import { AppDispatch, RootState } from "../../redux/Store";

const Question = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // for storing the orignal questions list
  const questions = useSelector((state: RootState) => state.quiz.questions);
  const searchLength = 2;

  // getting all the categories list
  const categoryList = useSelector((state: RootState) => state.category);
  const [searchByName, setSearchByName] = useState<string>("");

  // function to dispatch delete operation for question
  const dispatchDeleteOperation = async (id: string) => {
    const userOption = window.confirm(
      "Are you sure you want to delete this question?"
    );
    if (userOption) {
      await dispatch(deleteQuestion(id));
    }
  };

  // function to handle add question button click
  const handleAddQuestionClick = () => {
    const data: ImyQuestionData = {
      id: "",
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      correctOption: "",
      categoryName: "",
      description: "",
    };

    navigate("/dashboard/admin/addquestion", { state: { ...data } });
  };

  useEffect(() => {
    (async () => {
      await dispatch(getQuestions(searchLength));
    })();
  }, []);

  return (
    <div className="min-h-[100vh] w-full p-5 ml-60">
      <h2 className="text-4xl font-bold text-center mb-10">
        Welcome to the <span className="text-[#00C8AC]">Question Page</span>
      </h2>

      <div className="shadow-lg p-2 rounded-md w-full">
        {/* for search and add question */}
        <header className="border border-b-gray-600 flex items-center justify-between p-4">
          <form className="flex items-center gap-5 shadow-md">
            <input
              className="py-1 px-2 font-semibold"
              type="text"
              placeholder="Search question by name"
              value={searchByName}
              onChange={(event) => setSearchByName(event?.target.value)}
            />
            <button
              type="submit"
              className="py-1 px-2 bg-[#00C8AC] hover:bg-[#35b4a3] transition-all ease-in-out duration-300 text-white"
            >
              <AiOutlineSearch size={24} />
            </button>
          </form>
          <button
            onClick={handleAddQuestionClick}
            className="border-2 py-1 px-2 text-center border-[#00C8AC] rounded-sm bg-[#00C8AC] text-white transition-all ease-in-out duration-300 hover:shadow-[0_0_5px_#00C8AC] font-semibold"
          >
            Add Question
          </button>
        </header>

        {/* adding the table to display question list */}
        <table className="overflow-x-auto w-full object-fill">
          <thead className="bg-gray-200">
            <tr className="align-text-top">
              <th className="p-1 border border-r-gray-600 border-b-gray-600">
                S No.
              </th>
              <th className="p-1 border border-r-gray-600 border-b-gray-600">
                Question
              </th>
              <th className="p-1 border border-r-gray-600 border-b-gray-600">
                Option 1
              </th>
              <th className="p-1 border border-r-gray-600 border-b-gray-600">
                Option 2
              </th>
              <th className="p-1 border border-r-gray-600 border-b-gray-600">
                Option 3
              </th>
              <th className="p-1 border border-r-gray-600 border-b-gray-600">
                Option 4
              </th>
              <th className="p-1 border border-r-gray-600 border-b-gray-600">
                Correct Answer
              </th>
              <th className="p-1 border border-r-gray-600 border-b-gray-600">
                <select
                  name="category"
                  id="category"
                  className="bg-transparent"
                >
                  <option value="all">All</option>
                  {categoryList.map((element) => {
                    return (
                      <option key={element.id} value={element?.categoryName}>
                        {element?.categoryName}
                      </option>
                    );
                  })}
                </select>
              </th>
              <th className="p-1 border border-r-gray-600 border-b-gray-600">
                Description
              </th>
              <th className="p-1" colSpan={2}>
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {questions &&
              questions.map((element, index) => {
                if (!element) {
                  return;
                }
                return (
                  <tr
                    key={element?.id}
                    className="align-text-top border border-gray-600 font-medium"
                  >
                    <td className="p-1 text-center border border-r-gray-600 border-b-gray-600">
                      {index + 1}
                    </td>
                    <td className="p-1 border border-r-gray-600 border-b-gray-600">
                      {element?.question}
                    </td>
                    <td className="p-1 border border-r-gray-600 border-b-gray-600">
                      {element?.option1}
                    </td>
                    <td className="p-1 border border-r-gray-600 border-b-gray-600">
                      {element?.option2}
                    </td>
                    <td className="p-1 border border-r-gray-600 border-b-gray-600">
                      {element?.option3}
                    </td>
                    <td className="p-1 border border-r-gray-600 border-b-gray-600">
                      {element?.option4}
                    </td>
                    <td className="p-1 border border-r-gray-600 border-b-gray-600">
                      {element?.correctOption}
                    </td>
                    <td className="p-1 border border-r-gray-600 border-b-gray-600">
                      {element?.categoryName}
                    </td>
                    <td className="p-1 border border-r-gray-600 border-b-gray-600">
                      {element?.description}
                    </td>
                    <td
                      onClick={() =>
                        navigate("/dashboard/admin/addquestion", {
                          state: { ...element },
                        })
                      }
                      className="w-14 text-center py-1 font-medium text-green-600 border border-r-gray-600 border-t-gray-600 border-b-gray-600 cursor-pointer"
                    >
                      Edit
                    </td>
                    <td
                      className="w-14 text-center py-1 font-medium text-red-600 cursor-pointer"
                      onClick={() => dispatchDeleteOperation(element?.id!)}
                    >
                      Delete
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
          Showing {0} to {5} of {100} results
        </p>

        {/* buttons for next and previous */}
        <div className="space-x-4">
          <button
            // onClick={handlePaginationPreviousBtn}
            className="border-[1.5px] border-[#00C8AC] rounded-sm px-4 py-1 transition-all ease-in-out duration-300 hover:shadow-[0_0_5px_#00C8AC]"
          >
            Previous
          </button>
          <button
            // onClick={handlePaginationNextBtn}
            className="border-[1.5px] border-[#00C8AC] rounded-sm px-4 py-1 transition-all ease-in-out duration-300 hover:shadow-[0_0_5px_#00C8AC]"
          >
            Next
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Question;
