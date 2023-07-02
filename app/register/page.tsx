'use client';

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useCallback, useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AiFillApple, AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import Input from "../components/Input";
import Button from "../components/Button";
import Loading from "../components/Loading";
import Container from "../components/Container";
import axios from "axios";

export default function Register() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { data: session, status } = useSession();

    console.log(session, status);

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
                router.push('/login');
            })
            .catch((error) => {
                console.log(error);
                setError('email', { message: 'Email already being used' });
                setErrorMessage('Email already being used');
            })
            .finally(() => {
                setIsLoading(false);
            })
    };

    const handleSubmitRegister = useCallback(() => {
        if(isLoading) return;
    
        handleSubmit(onSubmit)();
      }, [isLoading]);

    const handleRedirectSignIn = useCallback(() => {
        if(isLoading) return;
    
        router.push('/login');
      }, [isLoading]);

    useEffect(() => {
        // If a user is already authenticated, redirect them to the homepage
        if (status === "authenticated") {
          router.push("/");
        }
    }, [status, router]);

    if (status === "loading") {
        return <Loading />;
    };

    return (
        <Container>
          {/*Content*/}
          Register Page
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
            <div className="flex flex-col gap-4 mt-3">
                <Button 
                    disabled={isLoading} 
                    label='Continue'
                    onClick={handleSubmitRegister}
                />
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
                            onClick={handleRedirectSignIn} 
                            className="
                            text-neutral-800
                            cursor-pointer 
                            hover:underline
                            "
                        >Log In</span>
                    </p>
                </div>
            </div>
        </Container>
    )
  }
  