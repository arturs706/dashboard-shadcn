"use client";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { loginAction } from '../actions/actions';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useAuth, AuthContextProps } from "@/context/authContext";
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof formSchema>;

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setAuthenticated, setAccLevel, setUserId, setUsername } = useAuth() as AuthContextProps; 
  const router = useRouter();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function formatFieldError(fieldError: string | { errors: string[] }): string {
    if (typeof fieldError === 'string') {
      return fieldError;
    }
    if (Array.isArray(fieldError.errors)) {
      return fieldError.errors.join(", ");
    }
    return "An error occurred";
  }

  async function onSubmit(values: LoginFormData) {
    setLoading(true);
    setError("");
    try {
      const [data, actionError] = await loginAction(values);
      if (actionError) {
        if (actionError.formattedErrors) {
          Object.entries(actionError.formattedErrors).forEach(([field, fieldErrors]) => {
            form.setError(field as keyof LoginFormData, {
              type: "manual",
              message: formatFieldError(fieldErrors as unknown as string | { errors: string[] })
            });
          });
        } else {
          setError(actionError.message || "An error occurred during login.");
        }
      } else if (data && data.errors) {
        setAuthenticated(true);
        setAccLevel(data.user?.acc_level || '');
        setUserId(data.user?.user_id || '');
        setUsername(data.user?.username || '');

        Object.entries(data.errors).forEach(([field, error]) => {
          if (error) {
            form.setError(field as keyof LoginFormData, {
              type: "manual",
              message: formatFieldError(error)
            });
          }
        });
      } else {
        console.log('data.user:', data.user);
        setAuthenticated(true);
        form.reset();
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
      router.push('/'); 
    }
  }

  return (
    <main className="flex justify-center items-center h-screen">
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>Enter your username and password to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Username</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="username" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" placeholder="********" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Login'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
