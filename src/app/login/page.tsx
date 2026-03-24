"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";


export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onLogin = async () =>{
        try{
            setLoading(true);
            const response = await axios.post("/api/users/login",user);
            console.log("Login success", response.data);
            router.push("/profile");            
        } catch(error: any){
            console.log("Login failed", error.message);
            toast.error(error.message);
        } 
        finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0){
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
                        Login
                    </h1>
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
                    <button onClick={onLogin} className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded">{buttonDisabled? "Disabled" : "Login"}</button>
                </div>
                <Link href="/signup">Visit Sign Up Page</Link>
            </div>
        </div>
    );
}