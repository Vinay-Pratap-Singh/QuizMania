const AddQuestion = () => {
  return (
    <div className="h-[100vh] w-full flex items-center justify-center">
      {/* container for question card */}
      <div className=" shadow-md rounded-md flex flex-col gap-4 items-center w-full mx-[5%] h-[90%] p-4">
        <h2 className="text-2xl font-bold relative">
          Add New <span className="text-[#00C8AC]">Question</span>
        </h2>

        <form className="grid grid-cols-2 gap-x-10 gap-y-5 items-center w-full">
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
                placeholder="Enter the option 1"
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
                placeholder="Enter the option 2"
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
                placeholder="Enter the option 3"
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
                placeholder="Enter the option 4"
              />
            </div>
          </div>

          {/* for answer, description and options */}
          <div className="shadow-sm p-4 space-y-4">
            <div className="flex flex-col w-full">
              <label className="font-semibold" htmlFor="description">
                Description
              </label>
              <textarea
                className="border border-white border-b-black h-48 resize-none"
                name="description"
                id="description"
                placeholder="Write the desription of your question (Optional)"
              ></textarea>
            </div>

            {/* for correct option */}
            <div className="flex flex-col w-full">
              <label className="font-semibold" htmlFor="correctAnswer">
                Correct Option
              </label>
              <select name="correctAnswer" id="correctAnswer" required>
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
              <select name="categoryName" id="categoryName" required>
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
