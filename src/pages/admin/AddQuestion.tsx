import { InewQuestionData } from "../../config/interfaces";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/Store";
import { addNewQuestion } from "../../redux/QuizSlice";

const AddQuestion = () => {
  const dispatch = useDispatch<AppDispatch>();

  // for storing user input
  const [inputData, setInputData] = useState<InewQuestionData>({
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    correctOption: "",
    categoryName: "",
    description: "",
  });

  // function to handle input box
  const handleInputBox = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setInputData({ ...inputData, [name]: value });
  };

  // function to handle form submit
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //   checking for the empty fields
    if (
      !inputData.question ||
      !inputData.option1 ||
      !inputData.option2 ||
      !inputData.option3 ||
      !inputData.option4 ||
      !inputData.correctOption ||
      !inputData.categoryName
    ) {
      toast.error("All fields are mandatory except description");
      return;
    }

    //   checking the question length
    if (inputData.question.length < 5) {
      toast.error("Question length should be greater than 5 characters");
      return;
    }

    //   calling the api to add data
    await dispatch(addNewQuestion(inputData));

    //   resetting the input value
    setInputData({
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      correctOption: "",
      categoryName: "",
      description: "",
    });
  };

  return (
    <div className="h-[100vh] w-full flex items-center justify-center">
      {/* container for question card */}
      <div className=" shadow-md rounded-md flex flex-col gap-4 items-center w-full mx-[5%] h-[90%] p-4">
        <h2 className="text-2xl font-bold relative">
          Add New <span className="text-[#00C8AC]">Question</span>
        </h2>

        <form
          onSubmit={handleFormSubmit}
          className="grid grid-cols-2 gap-x-10 gap-y-5 items-center w-full"
        >
          {/* for question and options */}
          <div className="shadow-sm p-4 space-y-4">
            {/* for question */}
            <div className="flex flex-col w-full">
              <label className="font-semibold" htmlFor="question">
                Question
              </label>
              <textarea
                required
                className="border border-white border-b-black h-14 resize-none"
                name="question"
                id="question"
                placeholder="Write your question"
                value={inputData.question}
                onChange={handleInputBox}
              ></textarea>
            </div>

            {/* option 1 */}
            <div className="flex flex-col w-full">
              <label className="font-semibold" htmlFor="option1">
                Option 1
              </label>
              <input
                required
                className="border border-white border-b-black"
                type="text"
                id="option1"
                name="option1"
                placeholder="Enter the option 1"
                value={inputData.option1}
                onChange={handleInputBox}
              />
            </div>

            {/* option 2 */}
            <div className="flex flex-col w-full">
              <label className="font-semibold" htmlFor="option2">
                Option 2
              </label>
              <input
                required
                className="border border-white border-b-black"
                type="text"
                id="option2"
                name="option2"
                placeholder="Enter the option 2"
                value={inputData.option2}
                onChange={handleInputBox}
              />
            </div>

            {/* option 3 */}
            <div className="flex flex-col w-full">
              <label className="font-semibold" htmlFor="option3">
                Option 3
              </label>
              <input
                required
                className="border border-white border-b-black"
                type="text"
                id="option3"
                name="option3"
                placeholder="Enter the option 3"
                value={inputData.option3}
                onChange={handleInputBox}
              />
            </div>

            {/* option 4 */}
            <div className="flex flex-col w-full">
              <label className="font-semibold" htmlFor="option4">
                Option 4
              </label>
              <input
                required
                className="border border-white border-b-black"
                type="text"
                id="option4"
                name="option4"
                placeholder="Enter the option 4"
                value={inputData.option4}
                onChange={handleInputBox}
              />
            </div>
          </div>

          {/* for answer, description and options */}
          <div className="shadow-sm p-4 space-y-4">
            <div className="flex flex-col w-full">
              <label className="font-semibold" htmlFor="description">
                Answer Description
              </label>
              <textarea
                className="border border-white border-b-black h-48 resize-none"
                name="description"
                id="description"
                placeholder="Write the desription of your correct answer (Optional)"
                value={inputData.description}
                onChange={handleInputBox}
              ></textarea>
            </div>

            {/* for correct option */}
            <div className="flex flex-col w-full">
              <label className="font-semibold" htmlFor="correctOption">
                Correct Option
              </label>
              <select
                name="correctOption"
                id="correctOption"
                required
                onChange={handleInputBox}
              >
                <option value="">Choose Me</option>
                <option value="option1">Option1</option>
                <option value="option2">Option2</option>
                <option value="option3">Option3</option>
                <option value="option4">Option4</option>
              </select>
            </div>

            {/* for category name option */}
            <div className="flex flex-col w-full">
              <label className="font-semibold" htmlFor="categoryName">
                Category Name
              </label>
              <select
                name="categoryName"
                id="categoryName"
                required
                onChange={handleInputBox}
              >
                <option value="">Choose Me</option>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
                <option value="js">JS</option>
              </select>
            </div>
          </div>

          {/* button to submit */}
          <button className="col-span-2 font-semibold text-lg border-2 py-1 text-center border-[#00C8AC] rounded-sm bg-[#00C8AC] text-white transition-all ease-in-out duration-300 hover:shadow-[0_0_5px_#00C8AC]">
            Add New Question
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddQuestion;
