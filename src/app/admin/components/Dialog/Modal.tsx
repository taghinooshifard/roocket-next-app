import React, { KeyboardEventHandler, useEffect, useRef, useState } from 'react';
import { AiTwotoneCloseSquare } from 'react-icons/ai';
interface Props{
    isOpen:boolean;
    hasCloseBtn:boolean;
    onClose:()=>void;
    children:React.ReactNode
}
function Modal(props:Props) {

    const modalRef = useRef<HTMLDialogElement>(null);
    const [isModalOpen, setModalOpen] = useState(props.isOpen);
    useEffect(() => {
        setModalOpen(props.isOpen);
      }, [props.isOpen]);

      useEffect(() => {
        const modalElement = modalRef.current;
        if (modalElement) {
          if (isModalOpen) {
            modalElement.showModal();
          } else {
            modalElement.close();
          }
        }
      }, [isModalOpen]);

      const handleCloseModal = () => {
        if (props.onClose!=undefined) {
            props.onClose();
        }
        setModalOpen(false);
      };
      const handleKeyDown:KeyboardEventHandler<HTMLDialogElement> = (event) => {
        if (event.key === "Escape") {
          handleCloseModal();
        }
      };

  return (
    <dialog id="form-modal" className="rounded-md  shadow-md shadow-blue-300 -z-0" ref={modalRef} onKeyDown={handleKeyDown}>
    <div className="flex justify-end bg-sky-100">
    {props.hasCloseBtn&& <button
                   className=" text-gray-500 hover:bg-red-600"
                   onClick={handleCloseModal}>
                    <AiTwotoneCloseSquare className="w-8 h-8"/>
                    </button>}
                    </div>
    {props.children}
  </dialog>
  )
}

export default Modal;
