import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import prisma from '@/lib/prisma'

export async function getSession() {
    return await getServerSession(authConfig);
}

export default async function getCurrentUser() {
    try {
        const session = await getSession();

        if(!session?.user?.email)return null
        
        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string
            }
        });

        if(!currentUser) return null

        return currentUser;
    } catch (error) {
        return null;
    }
}