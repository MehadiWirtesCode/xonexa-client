import { IoCheckmarkDoneCircleOutline, IoCloseCircle } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { useEffect } from "react";
export const AlertModal = ({ setAlert, message }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert(false);
    }, 3000); // 3 sec
    return () => clearTimeout(timer);
  }, [setAlert]);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      <div className="bg-green-50 border border-green-400 text-green-700 rounded-lg shadow-md overflow-hidden w-80">
        <div className="flex items-center p-2">
          <IoCheckmarkDoneCircleOutline className="text-2xl mr-2" />
          <div className="flex-1 text-sm">{message}</div>
          <button
            onClick={() => setAlert(false)}
            className="p-1 text-green-700 hover:text-green-900 active:text-green-500"
          >
            <IoMdClose className="text-xl" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-green-200">
          <div className="h-1 bg-green-500 animate-progress"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
        .animate-progress {
          animation: progress 3s linear forwards;
        }
      `}</style>
    </div>
  );
};
