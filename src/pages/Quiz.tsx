const Quiz = () => {
  return (
    <div className="h-[85vh] flex items-center justify-center">
      {/* creating the quiz template */}
      <form className="w-1/2 flex flex-col py-5 px-10 space-y-5 rounded-lg shadow-md">
        {/* header part of card */}
        <header className="w-full flex items-center justify-between font-semibold">
          <h1>5 of 10</h1>
          <h1>Timer : 04 : 30 min</h1>
        </header>

        {/* question and option section */}
        <section className="space-y-5 flex flex-col">
          <h1 className="font-bold">
            <span className="text-[#00C8AC]">Ques 1.</span> What is computer?
          </h1>

          {/* creating the options */}
          <div className="grid grid-cols-2 gap-y-5 gap-x-10 font-semibold">
            <div className="space-x-2">
              <input
                type="radio"
                id="option1"
                // value={data[index]?.answers?.answer_a}
                name="option"
              />
              <label htmlFor="option1"></label>
            </div>

            <div className="space-x-2">
              <input
                type="radio"
                id="option2"
                // value={data[index]?.answers?.answer_b}
                name="option"
              />
              <label htmlFor="option2"></label>
            </div>

            <div className="space-x-2">
              <input
                type="radio"
                id="option3"
                // value={data[index]?.answers?.answer_c}
                name="option"
              />
              <label htmlFor="option3"></label>
            </div>

            <div className="space-x-2">
              <input
                type="radio"
                id="option4"
                // value={data[index]?.answers?.answer_d}
                name="option"
              />
              <label htmlFor="option4"></label>
            </div>
          </div>

          {/* adding previous and next button */}
          <div className="flex items-center justify-between">
            <button className="w-24 border-2 border-[#00C8AC] py-1 rounded-md font-bold text-[#00C8AC] transition-all ease-in-out duration-300 hover:shadow-[0_0_5px_#00C8AC]">
              Previous
            </button>
            <button className="w-24 border-2 border-[#00C8AC] py-1 rounded-md font-bold text-[#00C8AC] transition-all ease-in-out duration-300 hover:shadow-[0_0_5px_#00C8AC]">
              Next
            </button>
          </div>

          {/* adding the submit button */}
          <button className="border-2 border-[#00C8AC] px-3 py-1 rounded-md font-bold text-lg bg-[#00C8AC] text-white transition-all ease-in-out duration-300 hover:shadow-[0_0_5px_#00C8AC] w-fit self-center">
            Submit Answers
          </button>
        </section>
      </form>
    </div>
  );
};

export default Quiz;
