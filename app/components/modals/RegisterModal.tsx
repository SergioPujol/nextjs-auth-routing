'use client';

import useLoginModal from "@/app/hooks/useLoginModel";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import axios from "axios";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import Input from "../Input";
import { FcGoogle } from "react-icons/fc";
import { AiFillApple, AiFillGithub } from "react-icons/ai";
import { signIn } from "next-auth/react";
import Button from "../Button";

const RegisterModal = () => {

    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
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
            name: '',
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/register', data)
          .then(() => {
              console.log('Registered');
              registerModal.onClose();
              loginModal.onOpen();
          })
          .catch((error) => {
              console.log(error);
              setError('email', { message: 'Email already being used' });
              setErrorMessage('Email already being used');
          })
          .finally(() => {
              setIsLoading(false);
          })
    }

    const onToggle = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen();
    }, [registerModal, loginModal])

    const bodyContent = (
        <>
          <div className="flex flex-col gap-4">
            <div className="font-light text-neutral-500">Create an account</div>
            <Input
              id="email"
              label="Email"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
            <Input
              id="name"
              label="Name"
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
          <div 
            className="
              text-neutral-500 
              text-center 
              mt-4 
              font-light
            "
          >
            <p>Already have an account?<span> </span>
              <span 
                onClick={onToggle} 
                className="
                  text-neutral-800
                  cursor-pointer 
                  hover:underline
                "
                >Log in</span>
            </p>
          </div>
        </div>
      )
    
      return (
        <Modal
          disabled={isLoading}
          isOpen={registerModal.isOpen}
          title="Register"
          actionLabel="Continue"
          onClose={registerModal.onClose}
          onSubmit={handleSubmit(onSubmit)}
          body={bodyContent}
          footer={footerContent}
        />
      );
}

export default RegisterModal