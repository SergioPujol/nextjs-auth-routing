import { NextAuthOptions } from "next-auth";
import bcrypt from "bcrypt";

import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import AppleProvider from "next-auth/providers/apple";
import prisma from "./prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const authConfig: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Sign in",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "example@example.com"
                },
                password: {
                    label: "Password",
                    type: "password"
                }
            },
            async authorize(credentials) {
                // User authentication with email and password
                if (!credentials?.email || !credentials?.password) throw new Error('Invalid credentials');
        
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });
        
                if (!user || !user?.password) throw new Error('Invalid credentials');
                
                // Verify password
                const isPasswordCorrect = await bcrypt.compare(
                    credentials.password,
                    user.password
                );
        
                if (!isPasswordCorrect) throw new Error('Invalid credentials');
        
                return user;
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID as string,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string
        }),
        AppleProvider({
            clientId: process.env.APPLE_ID as string,
            clientSecret: process.env.APPLE_SECRET as string
        })
        /* Add providers as needed from next-auth/providers */
    ],
    pages: { // Custom error message display pages
        signIn: '/login'
    },
    session: {
        strategy: 'jwt'
    },
    debug: process.env.NODE_ENV === 'development', // Debug only enabled when env is development
    secret: process.env.NEXTAUTH_SECRET
}
