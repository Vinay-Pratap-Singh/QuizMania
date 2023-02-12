const QuizStarterPage = () => {
  return (
    <div className="min-h-[85vh] flex items-center justify-center">
      {/* creating the starter card */}
      <div className="flex flex-col items-center justify-center p-10 space-y-5 rounded-lg shadow-[0_0_10px_#00C8AC]">
        <h1 className="text-4xl font-bold text-[#00C8AC] drop-shadow-md">
          Welcome to the Quiz
        </h1>
        <p className="font-semibold">Customize the quiz before moving ahead</p>

        {/* adding the options for user */}
        <form className="flex flex-col space-y-5">
          <div className="grid grid-cols-2 gap-5">
            {/* result evaluation system */}
            <div className="font-semibold">
              <label
                className="text-[#00C8AC] font-bold text-lg"
                htmlFor="evaluation"
              >
                Evaluation :{" "}
              </label>
              <select
                className="text-sm"
                name="evaluation"
                id="evaluation"
                required
              >
                <option value="normal">Normal</option>
                <option value="strict">Strict</option>
              </select>
            </div>

            {/* adding the game level option */}
            <div className="font-semibold">
              <label
                className="text-[#00C8AC] font-bold text-lg"
                htmlFor="level"
              >
                Quiz Level :{" "}
              </label>
              <select className="text-sm" name="level" id="level" required>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            {/* adding the quiz length option */}
            <div className="font-semibold">
              <label
                className="text-[#00C8AC] font-bold text-lg"
                htmlFor="questions"
              >
                Quiz Length :{" "}
              </label>
              <select
                className="text-sm"
                name="questions"
                id="questions"
                required
              >
                <option value="short">Short (5 Q)</option>
                <option value="medium">Medium (10 Q)</option>
                <option value="large">Large (15 Q)</option>
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
              >
                <option value="uncategorized">Uncategorized</option>
                <option value="linux">Linux</option>
                <option value="bash">Bash</option>
                <option value="docker">Docker</option>
                <option value="sql">SQL</option>
                <option value="cms">CMS</option>
                <option value="devops">DevOps</option>
                <option value="code">Code</option>
              </select>
            </div>
          </div>

          {/* adding the button */}
          <button className="border-2 border-[#00C8AC] px-6 py-2 rounded-lg font-bold text-lg bg-[#00C8AC] text-white transition-all ease-in-out duration-300 hover:shadow-[0_0_5px_#00C8AC]">
            Start the Skill Battle
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuizStarterPage;
