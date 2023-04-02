import { ImyQuestionData } from "../config/interfaces";

// @ts-ignore
const AnswerResult = ({ questionsToBeDisplayed, answersSelectedByUser }) => {
  return (
    <div className="mt-10 w-3/4">
      <h1 className="font-bold text-center text-2xl mb-5">
        Result Summary with Description
      </h1>

      {/* Q&A container */}
      <section className="w-full space-y-6 flex flex-col">
        {/* Q&A Card */}
        {questionsToBeDisplayed.map(
          (element: ImyQuestionData, index: number) => {
            const colorCode =
              element.correctOption === answersSelectedByUser[index]
                ? "#94fcab"
                : answersSelectedByUser[index] === ""
                ? "#fff884"
                : "#ffb7b7";
            return (
              <div
                key={element?.id}
                className="w-full space-y-2 shadow-md p-2"
                style={{ backgroundColor: colorCode }}
              >
                <h1 className="font-bold text-left">
                  Ques {index + 1}. {element?.question}
                </h1>

                {/* creating the options */}
                <div className="grid grid-cols-2 gap-y-2 gap-x-10 font-semibold text-left">
                  <p>1. {element?.option1}</p>
                  <p>2. {element?.option2}</p>
                  <p>3. {element?.option3}</p>
                  <p>4. {element?.option4}</p>
                </div>

                {/* correct option */}
                <p className="text-left text-sm font-semibold">
                  <span className="font-bold">Correct Option : </span>
                  {element?.correctOption}
                </p>

                {/* user option */}
                <p className="text-left text-sm font-semibold">
                  <span className="font-bold">Your Option : </span>
                  {answersSelectedByUser[index]
                    ? answersSelectedByUser[index]
                    : "Not Answered"}
                </p>

                {/* answer description */}
                <p className="text-left text-sm font-semibold">
                  <span className="font-bold">
                    Description <br />
                  </span>
                  {element.description
                    ? element.description
                    : "No description available"}
                </p>
              </div>
            );
          }
        )}
      </section>
    </div>
  );
};

export default AnswerResult;
