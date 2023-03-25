import { ChangeEvent, useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ImyQuestionData } from "../../config/interfaces";
import { getCategory } from "../../redux/CategorySlice";
import { deleteQuestion, getAllQuestion } from "../../redux/QuizSlice";
import { AppDispatch, RootState } from "../../redux/Store";

const Question = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // for storing the orignal questions list
  const [orgQuestions, setOrgQuestions] = useState(
    useSelector((state: RootState) => state.quiz.questions)
  );

  // for storing the filtered list of questions
  const [filteredQuestions, setFilteredQuestions] = useState(orgQuestions);

  // getting all the categories list
  const categoryList = useSelector((state: RootState) => state.category);

  const [searchByName, setSearchByName] = useState<string>("");

  // function to dispatch delete operation for question
  const dispatchDeleteOperation = async (id: string) => {
    await dispatch(deleteQuestion(id));
    await dispatch(getAllQuestion());
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

  // function for filtering the questions by the category name
  const filterQuestions = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    if (value === "all") {
      setFilteredQuestions([...orgQuestions]);
      return;
    }

    const newData = orgQuestions.filter((element) => {
      return element.categoryName === value;
    });

    setFilteredQuestions(newData);
  };

  // function to handle the question search by name
  const handleSearchQuestionByName = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const newData = orgQuestions.filter((element) => {
      return element.question.includes(searchByName);
    });
    setFilteredQuestions(newData);
  };

  // for getting the question from database
  useEffect(() => {
    (async () => {
      await dispatch(getCategory());
      await dispatch(getAllQuestion());
    })();

    // setting the filtered question list
    setFilteredQuestions([...orgQuestions]);
  }, []);

  return (
    <div className="min-h-[100vh] w-full p-5 ml-60">
      <h2 className="text-4xl font-bold text-center mb-10">
        Welcome to the <span className="text-[#00C8AC]">Question Page</span>
      </h2>

      <div className="shadow-lg p-2 rounded-md">
        {/* for search and add question */}
        <header className="border border-b-gray-600 flex items-center justify-between p-4">
          <form
            onSubmit={handleSearchQuestionByName}
            className="flex items-center gap-5 shadow-md"
          >
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
        <table className="text-base overflow-x-auto ">
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
                  // @ts-ignore
                  onChange={filterQuestions}
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
            {filteredQuestions.map((element, index) => {
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
                    onClick={() => dispatchDeleteOperation(element?.id)}
                  >
                    Delete
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Question;
