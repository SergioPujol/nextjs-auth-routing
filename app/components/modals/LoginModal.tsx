'use client';

import useLoginModal from "@/app/hooks/useLoginModel";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../Input";
import Modal from "./Modal";
import { AiFillApple, AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import Button from "../Button";

const LoginModal = () => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const {
        register,
        handleSubmit,
        setError,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const showSignInErrors = (message: string) => {
        setError('email', { message });
        setError('password', { message });
        setErrorMessage(message);
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        signIn('credentials', {
            ...data,
            redirect: false
        })
            .then((callback) => {
                setIsLoading(false);

                if(callback?.error) {
                    console.log(callback.error)
                    showSignInErrors(callback.error)
                } else if(callback?.ok) {
                    console.log('Logged with credentials');
                    router.refresh();
                    loginModal.onClose();
                }
                
            })
    };

    const onToggle = useCallback(() => {
        loginModal.onClose();
        registerModal.onOpen();
    }, [loginModal, registerModal]);

    const bodyContent = (
        <>
            <div className="flex flex-col gap-4">
                <div className="font-light text-neutral-500">Welcome back</div>
                <Input
                    id="email"
                    label="Email"
                    disabled={isLoading}
                    register={register}  
                    errors={errors}
                    required
                />
                <Input
                    id="password"
                    label="Password"
                    type="password"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
            {errorMessage && <p className="text-rose-500 text-xs font-light mt-2">{errorMessage}</p>}
        </>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
          <hr />
          <div className="text-xs font-light text-neutral-500 text-center">Or continue with</div>
          <div className="flex gap-x-2">
            {/* icons imported from react-icons */}
            <Button 
                label="Google"
                icon={FcGoogle}
                onClick={() => signIn('google')}
            />
            <Button 
                label="Github"
                icon={AiFillGithub}
                onClick={() => signIn('github')}
            />
            {/* Add providers as needed
                <Button 
                    label="Facebook"
                    icon={AiFillFacebook}
                    onClick={() => signIn('facebook')}
                />
                ...
            */}
            <Button 
                label="Apple"
                icon={AiFillApple}
                onClick={() => signIn('apple')}
            />
          </div>
          <div className="text-sm text-neutral-500 text-center mt-4 font-light">
            <p> Don't have an account?<span> </span>
                <span 
                    onClick={onToggle} 
                    className="
                    text-neutral-800
                    cursor-pointer 
                    hover:underline
                    "
                >Sign up</span>
            </p>
          </div>
        </div>
      )
    
    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Login"
            actionLabel="Continue"
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
}

export default LoginModal