'use client';

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "./Avatar";
import { useCallback, useEffect, useRef, useState } from "react";
import MenuItem from "./MenuItem";
import useLoginModal from "@/app/hooks/useLoginModel";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";

interface UserMenuProps {
    currentUser?: User | null;
}

const UserMenu: React.FC<UserMenuProps> = ({
    currentUser
}) => {

    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, [])

    const modalRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const checkIfClickedOutside = (event: MouseEvent) => {
          if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            setIsOpen(false)
          }
        };
        document.addEventListener("click", checkIfClickedOutside);
        return () => {
          document.removeEventListener("click", checkIfClickedOutside);
        };
      }, [isOpen]);

  return (
    <div className="relative">
        <div className="flex flex-row items-center gap-3">
            <div
                onClick={toggleOpen}
                className="
                    p-3
                    md:py-1
                    md:px-2
                    border-[1px]
                    border-neutral-200
                    flex
                    flex-row
                    items-center
                    gap-3
                    rounded-full
                    cursor-pointer
                    hover:shadow-md
                    transition
                "
            >
                <AiOutlineMenu />
                <div className="hidden md:block">
                    <Avatar src={currentUser?.image}/>
                </div>
            </div>
        </div>

        {isOpen && (
            <div
                className="
                    absolute
                    rounded-xl
                    shadow-[0_2px_16px_rgba(0,0,0,0.12)]
                    w-52
                    bg-white
                    overflow-hidden
                    right-0
                    top-12
                    text-sm
                "
                ref={modalRef}
            >
                <div className="flex flex-col cursor-pointer my-2">
                    {currentUser ? (
                        <>
                            <MenuItem 
                                onClick={signOut}
                                label="Logout"
                            />
                        </>
                    ) : (
                        <>
                            <MenuItem 
                                onClick={loginModal.onOpen}
                                label="Login"
                            />
                            <MenuItem 
                                onClick={registerModal.onOpen}
                                label="Sign up"
                            />
                        </>
                    )}
                </div>
            </div>
        )}
    </div>
  )
}

export default UserMenu