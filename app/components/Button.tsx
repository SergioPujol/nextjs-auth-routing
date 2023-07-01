'use client';

import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({ 
  label, 
  onClick, 
  disabled,
  icon: Icon,
}) => {
  return ( 
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
        flex
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:bg-neutral-100
        transition
        w-full
        bg-white
        border-[#5474b3]
        text-[#5474b3]
        text-md
        py-3
        font-semibold
        border-2
        justify-center
        gap-2
      `}
    >
      {Icon && (
        <Icon
          size={24}
          className=""
        />
      )}
      {label}
    </button>
   );
}
 
export default Button;