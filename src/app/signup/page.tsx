"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";


export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: ""
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onSignup = async () =>{
        try{
            setLoading(true);
            const response = await axios.post("/api/users/signup",user);
            console.log("Signup success", response.data);
            router.push("/login");            
        } catch(error: any){
            console.log("Signup failed", error.message);
            toast.error(error.message);
        } finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0 && user.username.length>0){
            setButtonDisabled(false);
        }
        else{
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex justify-center items-center text-center flex-row">
            <div className="w-1/2 border-2 p-2">
                <div className="w-full p-2">
                    <h1 className="text-2xl font-bold">
                        Sign Up
                    </h1>
                </div>
                <div className="w-full p-2">
                    <label htmlFor="username" className="mb-1 font-medium">
                        Username
                    </label>
                    <input
                        id="username"
                        type="text"
                        value={user.username}
                        onChange={(e) =>
                            setUser({
                                ...user,
                                username: e.target.value,
                            })
                        }
                        placeholder="username"
                        className="border rounded px-3 py-2"
                    />
                </div>
                <div className="w-ful p-2">
                    <label htmlFor="email" className="mb-1 font-medium">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={user.email}
                        onChange={(e) =>
                            setUser({
                                ...user,
                                email: e.target.value,
                            })
                        }
                        placeholder="email"
                        className="border rounded px-3 py-2"
                    />
                </div>
                <div className="w-full p-2">
                    <label htmlFor="password" className="mb-1 font-medium">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={user.password}
                        onChange={(e) =>
                            setUser({
                                ...user,
                                password: e.target.value,
                            })
                        }
                        placeholder="password"
                        className="border rounded px-3 py-2"
                    />
                </div>
                <div className="w-full p-2">
                    <button onClick={onSignup} className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded">{buttonDisabled? "Disabled" : "Signup"}</button>
                </div>
                <Link href="/login">Visit Login Page</Link>
            </div>
        </div>
    );
}