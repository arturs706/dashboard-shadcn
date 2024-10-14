"use server";
import "server-only";
import { cookies } from 'next/headers';
import { z } from "zod";
import { createServerAction } from "zsa";
import { redirect } from "next/navigation";

export const loginAction = createServerAction()
.input(z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
}))
.output(z.object({
    errors: z.object({
        username: z.string().optional(),
        password: z.string().optional(),
    })
}))
.handler(async ({ input }) => {
    const apiHost = process.env.API_HOST;
    const apiUrl = `${apiHost}/api/v1/users/login`;
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: input.username,
            passwd: input.password,
        }),
    });
    const data = await response.json();
    const setCookieHeader = response.headers.get('Set-Cookie');

    if (setCookieHeader) {
        const cookiesArray = setCookieHeader.split(', ');
        
        cookiesArray.forEach(cookieString => {
            const cookieParts = cookieString.split(';')[0]; 
            const [cookieName, cookieValue] = cookieParts.split('=');
            
            cookies().set(cookieName, cookieValue, {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',  
            });
        });
    }

    if (response.ok && data.message === "Login successful") {
        redirect('/');
    } else {
        return {
           errors: {
            password: "Invalid username or password",
           }
        };
    }
});
