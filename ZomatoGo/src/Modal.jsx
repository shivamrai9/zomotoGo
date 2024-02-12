import React, { useEffect } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children, onClose }) => {
  const modalRoot = document.getElementById("modal-root");
  const modalWrapper = document.createElement("div");

  useEffect(() => {
    modalRoot.appendChild(modalWrapper);

    return () => {
      modalRoot.removeChild(modalWrapper);
    };
  }, [modalRoot, modalWrapper]);

  return createPortal(
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded shadow-lg">
        {children}
        <button
          className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>,
    
    modalWrapper
  );
};

export default Modal;
