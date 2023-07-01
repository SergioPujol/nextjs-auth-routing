'use client';

import { 
  FieldErrors, 
  FieldValues, 
  UseFormRegister 
} from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>,
  errors: FieldErrors
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text", 
  disabled, 
  register,
  required,
  errors,
}) => {
  return (
    <div>
      <div className="w-full relative">
        <input
          id={id}
          disabled={disabled}
          {...register(id, { required, ...(id == 'email' && {
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email format'
            }
          }) })}
          placeholder=" "
          type={type}
          className={`
            peer
            w-full
            h-full
            px-3.5 
            py-4
            font-light 
            bg-white 
            border-2
            rounded-md
            outline-none
            disabled:opacity-70
            disabled:cursor-not-allowed
            z-10
            ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
            ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
          `}
        />
        <label 
          className={`
            absolute 
            left-2 
            top-0
            z-0 
            -translate-y-1/2 
            bg-white 
            px-1 
            text-xs
            pointer-events-none 
            duration-200 
            peer-placeholder-shown:top-1/2
            peer-placeholder-shown:text-sm
            peer-focus:top-0
            peer-focus:text-xs
            peer-focus:text-black
            ${errors[id] ? 'peer-focus:text-rose-500' : 'peer-focus:text-black'}
            ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}
          `}
        >
          {label}
        </label>
      </div>
      {errors[id] && errors[id]?.type == 'pattern' && <p className="text-rose-500 text-xs font-light mt-1">{errors[id]?.message as string}</p>}
    </div>
   );
}
 
export default Input;