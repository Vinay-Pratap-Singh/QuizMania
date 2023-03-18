import { ImyQuestionData } from "../config/interfaces";

// @ts-ignore
const AnswerResult = ({ questionsToBeDisplayed, answersSelectedByUser }) => {
  console.log(questionsToBeDisplayed, answersSelectedByUser);

  return (
    <div className="mt-10 w-3/4">
      <h1 className="font-bold text-center text-2xl mb-5">
        Result Summary with Description
      </h1>

      {/* Q&A container */}
      <section className="w-full space-y-6 flex flex-col shadow-md p-4">
        {/* Q&A Card */}
        {questionsToBeDisplayed.map(
          (element: ImyQuestionData, index: number) => {
            return (
              <div key={element?.id} className="w-full space-y-2">
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
                <p className="text-left text-sm">
                  <span className="font-semibold">Correct Option : </span>
                  {element?.correctOption}
                </p>

                {/* answer description */}
                {element.description && (
                  <p className="text-left text-sm">
                    <span className="font-semibold">
                      Description <br />
                    </span>
                    {element?.description}
                  </p>
                )}
              </div>
            );
          }
        )}
      </section>
    </div>
  );
};

export default AnswerResult;
