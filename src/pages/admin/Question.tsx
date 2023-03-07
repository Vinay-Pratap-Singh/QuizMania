import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { ImyQuestionData } from "../../config/interfaces";
import { deleteQuestion, getAllQuestion } from "../../redux/QuizSlice";
import { AppDispatch, RootState } from "../../redux/Store";

const Question = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [questions, setQuestions] = useState<ImyQuestionData[]>(
    useSelector((state: RootState) => state.quiz.questions)
  );

  // function to dispath get all question operation for question
  const dispatchGetAllQuestions = async () => {
    // getting all the question data
    const res = await dispatch(getAllQuestion());
    // @ts-ignore
    setQuestions([...res.payload]);
  };

  // function to dispath delete operation for question
  const dispatchDeleteOperation = async (id: string) => {
    await dispatch(deleteQuestion(id));
    dispatchGetAllQuestions();
  };

  useEffect(() => {
    dispatchGetAllQuestions();
  }, []);

  return (
    <div className="min-h-[100vh] w-full p-5 ml-60">
      <h2 className="text-4xl font-bold text-center mb-10">
        Welcome to the <span className="text-[#00C8AC]">Question Page</span>
      </h2>

      <div className="border-[1.5px] border-black">
        {/* for search and add question */}
        <header className="border border-b-gray-600 flex items-center justify-between p-2">
          <form className="flex items-center gap-5 border border-gray-600">
            <input
              className="py-1 px-2 font-semibold"
              type="text"
              placeholder="Search question by name"
            />
            <button
              type="submit"
              className="border border-l-gray-600 py-1 px-2"
            >
              <AiOutlineSearch size={24} />
            </button>
          </form>
          <button className="border-2 py-1 px-2 text-center border-[#00C8AC] rounded-sm bg-[#00C8AC] text-white transition-all ease-in-out duration-300 hover:shadow-[0_0_5px_#00C8AC] font-semibold">
            Add Question
          </button>
        </header>

        {/* adding the table to display question list */}
        <table className="text-base overflow-x-auto ">
          <thead className="bg-gray-200">
            <tr className="align-text-top">
              <th className="p-2 border border-r-gray-600 border-b-gray-600">
                S No.
              </th>
              <th className="p-2 border border-r-gray-600 border-b-gray-600">
                Question
              </th>
              <th className="p-2 border border-r-gray-600 border-b-gray-600">
                Option 1
              </th>
              <th className="p-2 border border-r-gray-600 border-b-gray-600">
                Option 2
              </th>
              <th className="p-2 border border-r-gray-600 border-b-gray-600">
                Option 3
              </th>
              <th className="p-2 border border-r-gray-600 border-b-gray-600">
                Option 4
              </th>
              <th className="p-2 border border-r-gray-600 border-b-gray-600">
                Correct Answer
              </th>
              <th className="p-2 border border-r-gray-600 border-b-gray-600">
                <select
                  name="category"
                  id="category"
                  className="bg-transparent"
                >
                  <option value="all">All</option>
                  <option value="html">HTML</option>
                  <option value="css">CSS</option>
                  <option value="js">JS</option>
                </select>
              </th>
              <th className="p-2 border border-r-gray-600 border-b-gray-600">
                Description
              </th>
              <th className="p-2" colSpan={2}>
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {questions.map((element, index) => {
              return (
                <tr
                  key={element?.id}
                  className="align-text-top border border-gray-600 font-medium"
                >
                  <td className="p-2 text-center border border-r-gray-600 border-b-gray-600">
                    {index + 1}
                  </td>
                  <td className="p-2 border border-r-gray-600 border-b-gray-600">
                    {element?.question}
                  </td>
                  <td className="p-2 border border-r-gray-600 border-b-gray-600">
                    {element?.option1}
                  </td>
                  <td className="p-2 border border-r-gray-600 border-b-gray-600">
                    {element?.option2}
                  </td>
                  <td className="p-2 border border-r-gray-600 border-b-gray-600">
                    {element?.option3}
                  </td>
                  <td className="p-2 border border-r-gray-600 border-b-gray-600">
                    {element?.option4}
                  </td>
                  <td className="p-2 border border-r-gray-600 border-b-gray-600">
                    {element?.correctOption}
                  </td>
                  <td className="p-2 border border-r-gray-600 border-b-gray-600">
                    {element?.categoryName}
                  </td>
                  <td className="p-2 border border-r-gray-600 border-b-gray-600">
                    {element?.description}
                  </td>
                  <td className="w-14 text-center py-1 font-medium text-green-600 border border-r-gray-600 border-t-gray-600 border-b-gray-600 cursor-pointer">
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
