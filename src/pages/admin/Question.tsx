import React, { useState, useEffect, Fragment } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ImyQuestionData, IupdateFunctionData } from "../../config/interfaces";
import { getCategory } from "../../redux/CategorySlice";
import {
  deleteQuestion,
  getAnswers,
  getQuestions,
} from "../../redux/QuizSlice";
import { AppDispatch, RootState } from "../../redux/Store";
import { toast } from "react-hot-toast";
import Loader from "../../components/Loader/Loader";
import { Dialog, Transition } from "@headlessui/react";

const Question = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  // for handling the modal
  const [isOpen, setIsOpen] = useState(false);
  const [deleteOperationData, setDeleteOperationData] = useState({
    quesID: "",
    ansID: "",
  });

  // for storing the orignal questions list
  const [orgQuesList, setOrgQuesList] = useState<IupdateFunctionData[]>([]);
  const {
    questions,
    isLoading: questionLoading,
    answers,
  } = useSelector((state: RootState) => state.quiz);
  const [questionToBeDisplayed, setQuestionToBeDisplayed] = useState<
    IupdateFunctionData[]
  >([]);
  const [filteredQues, setFilteredQues] = useState<IupdateFunctionData[]>([]);
  const quesLimit = 5;
  const [currentPage, setCurrentPage] = useState(1);
  let startIndex = (currentPage - 1) * quesLimit;
  let endIndex =
    startIndex + quesLimit > filteredQues.length
      ? filteredQues.length
      : startIndex + quesLimit;

  // getting all the categories list
  const { categoryData: categoryList, isLoading: categoryLoading } =
    useSelector((state: RootState) => state.category);
  const [searchByName, setSearchByName] = useState<string>("");

  // function to dispatch delete operation for question
  const dispatchDeleteOperation = async (data: {
    quesID: string;
    ansID: string;
  }) => {
    await dispatch(deleteQuestion(data));
    // getting the updated questions
    await dispatch(getQuestions());
    setIsOpen(false);
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

  // function to update the questions to be displayed
  const setQuestion = () => {
    setQuestionToBeDisplayed([]);
    const data: IupdateFunctionData[] = [];
    for (let i = startIndex; i < endIndex; i++) {
      data.push(filteredQues[i]);
    }
    setQuestionToBeDisplayed([...data]);
  };

  // function to handle the pagination next button click
  const handlePaginationNextButtonClick = () => {
    // checking for the last page
    if (currentPage * quesLimit >= filteredQues.length) {
      return;
    }
    setCurrentPage(currentPage + 1);
    setQuestion();
  };

  // function to handle the pagination previous button click
  const handlePaginationPreviousButtonClick = () => {
    // checking for the first page
    if (currentPage === 1) {
      return;
    }
    setCurrentPage(currentPage - 1);
    setQuestion();
  };

  // function to handle search question by name functionality
  const searchQuestionByName = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!searchByName) {
      const quesData = mergeQuesAndAns();
      setFilteredQues([...quesData]);
      setCurrentPage(1);
      return;
    }
    const data: IupdateFunctionData[] = orgQuesList.filter((element) => {
      const questionName = element?.question.toLowerCase();
      const inputQuestion = searchByName.toLowerCase().trim();
      return questionName.includes(inputQuestion);
    });
    setFilteredQues([...data]);
    setCurrentPage(1);
    toast.success("Empty search will return all questions");
  };

  // function to handle search question by category name functionality
  const searchQuestionByCategoryName = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const category = event.target.value;
    // if category is all
    if (category === "all") {
      setFilteredQues([...orgQuesList]);
      setCurrentPage(1);
      return;
    }
    const data: IupdateFunctionData[] = orgQuesList.filter((element) => {
      return element?.categoryName === category;
    });
    setFilteredQues([...data]);
    setCurrentPage(1);
  };

  // function to merge questions and answers
  const mergeQuesAndAns = () => {
    const quesData: IupdateFunctionData[] = [];
    questions.map((element) => {
      let desc = "";
      let correctOpt = "";
      let ansID = "";
      for (let i = 0; i < answers.length; i++) {
        if (answers[i].qid === element.id) {
          desc = answers[i].description;
          correctOpt = answers[i].correctOption;
          ansID = answers[i].id!;
          break;
        }
      }
      const data: IupdateFunctionData = {
        id: element?.id!,
        ansID: ansID,
        question: element?.question,
        option1: element?.option1,
        option2: element?.option2,
        option3: element?.option3,
        option4: element?.option4,
        correctOption: correctOpt,
        categoryName: element?.categoryName,
        description: desc,
      };
      quesData.push(data);
    });
    setOrgQuesList([...quesData]);
    return quesData;
  };

  // for updating the start and end index to fetch recent data
  useEffect(() => {
    startIndex = (currentPage - 1) * quesLimit;
    endIndex =
      startIndex + quesLimit > filteredQues.length
        ? filteredQues.length
        : startIndex + quesLimit;
    setQuestion();
  }, [currentPage, filteredQues, questions]);

  // for getting questions, answers and category data on first render
  useEffect(() => {
    (async () => {
      await dispatch(getQuestions());
      await dispatch(getCategory());
      await dispatch(getAnswers());
    })();
    const quesData = mergeQuesAndAns();
    setFilteredQues([...quesData]);
    setQuestion();
  }, []);

  // for handling questions change
  useEffect(() => {
    const quesData = mergeQuesAndAns();
    setQuestionToBeDisplayed([...quesData]);
    setFilteredQues([...quesData]);
  }, [questions, answers]);

  return categoryLoading || questionLoading ? (
    <Loader />
  ) : (
    <div className="min-h-screen w-full p-5 ml-60">
      <h2 className="text-4xl font-bold text-center mb-10">
        Welcome to the <span className="text-[#00C8AC]">Question Page</span>
      </h2>

      <div className="shadow-lg p-2 rounded-md w-full">
        {/* for search and add question */}
        <header className="border border-b-gray-600 flex items-center justify-between p-4">
          <form
            onSubmit={searchQuestionByName}
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
                  onChange={searchQuestionByCategoryName}
                >
                  <option value="all">All</option>
                  {categoryList &&
                    categoryList.map((element) => {
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
            {questionToBeDisplayed &&
              questionToBeDisplayed.map((element, index) => {
                if (!element) {
                  return;
                }
                return (
                  <tr
                    key={element?.id}
                    className="align-text-top border border-gray-600 font-medium"
                  >
                    <td className="p-1 text-center border border-r-gray-600 border-b-gray-600">
                      {startIndex + index + 1}
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
                      onClick={() => {
                        setIsOpen(true);
                        deleteOperationData.ansID = element.id;
                        deleteOperationData.quesID = element.ansID;
                        setDeleteOperationData({
                          ansID: element.id,
                          quesID: element.ansID,
                        });
                      }}
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
          Showing {filteredQues.length === 0 ? 0 : startIndex + 1} to {endIndex}{" "}
          of {filteredQues.length} results
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

      {/* adding the modal for delete operation */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Delete Question?
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete the question?
                    </p>
                  </div>

                  <div className="mt-4 space-x-5">
                    <button
                      onClick={() =>
                        dispatchDeleteOperation(deleteOperationData)
                      }
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent  bg-red-500 px-4 py-2 text-sm font-medium text-white  hover:shadow-[0_0_3px_red] transition-all duration-300 ease-in-out"
                    >
                      Delete Question
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-[#00C8AC] px-4 py-2 text-sm font-medium text-white  hover:shadow-[0_0_3px_#00C8AC] transition-all duration-300 ease-in-out"
                      onClick={() => setIsOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Question;
