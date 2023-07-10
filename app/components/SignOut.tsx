'use client';

import { signOut } from "next-auth/react"
import Button from "./Button";

const SignOut = () => {

  return (
    <Button 
      label="Logout"
      onClick={() => signOut()} 
    />
  )
}

export default SignOut