// "use client";

// import React, { useState } from 'react';
// import { Button } from "@/components/ui/button";
// import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Loader2 } from "lucide-react";
// import { loginAction } from '../actions/actions';
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { useAuth } from "@/context/authContext"; // Import the auth context

// const formSchema = z.object({
//   username: z.string().min(1, "Username is required"),
//   password: z.string().min(1, "Password is required"),
// });

// export default function Login() {
//   const [loading, setLoading] = useState(false); // Add loading state
//   const { setAuthenticated } = useAuth(); // Get the setAuthenticated function from context

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       username: "",
//       password: "",
//     },
//   });

//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     setLoading(true); // Set loading to true when submitting
//     try {
//       await loginAction(values);
//       form.reset();
//       setAuthenticated(true); // Update auth state after successful login
//     } finally {
//       setLoading(false); // Set loading to false after submission
//     }
//   }

//   return (
//     <main className="flex justify-center items-center h-screen">
//       <Card className="mx-auto max-w-sm">
//         <CardHeader className="space-y-1">
//           <CardTitle className="text-2xl font-bold">Login</CardTitle>
//           <CardDescription>Enter your email and password to login to your account</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//               <FormField
//                 control={form.control}
//                 name="username"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Username</FormLabel>
//                     <FormControl>
//                       <Input {...field} type="text" placeholder="username" />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="password"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Password</FormLabel>
//                     <FormControl>
//                       <Input {...field} type="password" placeholder="********" />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <Button type="submit" className="w-full" disabled={loading}>
//                 {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Login'}
//               </Button>
//             </form>
//           </Form>
//         </CardContent>
//       </Card>
//     </main>
//   );
// }





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
import { useAuth } from "@/context/authContext";
import { Alert, AlertDescription } from '@/components/ui/alert';

const formSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof formSchema>;

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setAuthenticated } = useAuth();

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
        Object.entries(data.errors).forEach(([field, error]) => {
          if (error) {
            form.setError(field as keyof LoginFormData, {
              type: "manual",
              message: formatFieldError(error)
            });
          }
        });
      } else {
        setAuthenticated(true);
        form.reset();
       
      }
    } catch (error) {
      // Handle unexpected errors
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setAuthenticated(true);

      setLoading(false);
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
                render={({ field }) => (
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
                render={({ field }) => (
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






