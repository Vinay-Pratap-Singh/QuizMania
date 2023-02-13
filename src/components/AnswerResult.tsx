const AnswerResult = () => {
  return (
    <div className="my-10">
      <h1 className="font-bold text-center text-2xl mb-5">
        Result Summary with Description
      </h1>

      {/* Q&A card */}
      <section className="w-[600px] space-y-2 flex flex-col shadow-md p-4">
        <h1 className="font-bold text-left">Ques 1. Creator of this app</h1>

        {/* creating the options */}
        <div className="grid grid-cols-2 gap-y-2 gap-x-10 font-semibold text-left">
          <p>a. Brahma</p>
          <p>b. Vishnu</p>
          <p>c. Mahesh</p>
          <p className="text-green-500 font-bold">d. Vinay</p>
        </div>

        {/* answer description */}
        <p className="text-left text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique,
          eum?
        </p>
      </section>
    </div>
  );
};

export default AnswerResult;
