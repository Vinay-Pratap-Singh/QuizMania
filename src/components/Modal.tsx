import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { ImyQuestionData } from "../config/interfaces";
import { useNavigate } from "react-router-dom";

interface Iprops {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  questions: ImyQuestionData[];
  userAnswers: string[];
}
const Modal: React.FC<Iprops> = ({
  isModalOpen,
  setIsModalOpen,
  questions,
  userAnswers,
}) => {
  const navigate = useNavigate();
  const handlSubmit = () => {
    setIsModalOpen(false);
    navigate("/result", {
      state: { questions, userAnswers },
    });
  };
  return (
    <>
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsModalOpen(false)}
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
                    Submit Quiz
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to submit your quiz?
                    </p>
                  </div>

                  <div className="mt-4 space-x-5">
                    <button
                      onClick={handlSubmit}
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-[#00C8AC] px-4 py-2 text-sm font-medium text-white  hover:shadow-[0_0_3px_#00C8AC] transition-all duration-300 ease-in-out"
                    >
                      Submit Quiz
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white  hover:shadow-[0_0_3px_red] transition-all duration-300 ease-in-out"
                      onClick={() => setIsModalOpen(false)}
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
    </>
  );
};
export default Modal;
