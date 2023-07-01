'use client';

import { MouseEventHandler, useCallback, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled
}) => {

  const modalRef = useRef<HTMLDivElement>(null); 

  const handleClose = useCallback(() => {
    if(disabled) return;

    onClose()
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if(disabled) return;

    onSubmit()
  }, [disabled, onSubmit]);

  const handleCloseOutsideModal = (event: React.MouseEvent<HTMLDivElement>) => {
    if(isOpen && modalRef.current && !modalRef.current.contains(event.target as Node)) onClose()
  }

  if(!isOpen) return null

  return (
    <div
      className="
        justify-center 
        items-center 
        flex 
        overflow-x-hidden 
        overflow-y-auto 
        fixed 
        inset-0 
        z-50 
        outline-none 
        focus:outline-none
        bg-neutral-800/70
      "
      onClick={handleCloseOutsideModal}
    >
      <div className="
        relative
        w-full
        md:w-4/6
        lg:w-3/6
        xl:w-2/5
        mx-auto 
        h-full 
        lg:h-auto
        md:h-auto
        "
        ref={modalRef}
      >
        {/*content*/}
        <div className={`
          h-full
        `}>
          <div className="
            translate
            h-full
            lg:h-auto
            md:h-auto
            border-0 
            rounded-lg 
            shadow-lg 
            relative 
            flex 
            flex-col 
            w-full 
            bg-white 
            outline-none 
            focus:outline-none
          "
          >
            {/*header*/}
            <div className="
              flex 
              items-center 
              p-6
              rounded-t
              justify-center
              relative
              border-b-[1px]
              "
            >
              <button
                className="
                  p-1
                  border-0 
                  hover:opacity-70
                  transition
                  absolute
                  left-9
                "
                onClick={handleClose}
              >
                <IoMdClose size={18} />
              </button>
              <div className="text-lg font-semibold">
                {title}
              </div>
            </div>
            {/*body*/}
            <div className="relative px-6 pt-6 pb-4 flex-auto">
              {body}
            </div>
            {/*footer*/}
            <div className="flex flex-col gap-2 p-6">
                <Button 
                    disabled={disabled} 
                    label={actionLabel} 
                    onClick={handleSubmit}
                  />
              {footer}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal