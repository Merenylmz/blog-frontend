"use client";

import { loginTask } from "@/Redux/actions/AuthActions";
import { login } from "@/Redux/Features/AuthSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

const Login = () => {
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState({email: "", password: ""});
    const [loadingIcon, setLoadingIcon] = useState(false);
    const router = useRouter();
    const loginOperation = async(e:any) =>{
        e.preventDefault();
        setLoadingIcon(true);
        const response = await loginTask(inputs);
        if (response.status != "OK") {
            setLoadingIcon(false);
            return alert("Try Again :)");
        }
        console.log(response[0]);
        
        dispatch(login({token:response.token, profilePhoto: response[0]}));
        setLoadingIcon(false);
        response.status == "OK" && router.push("/");
    };
    return (
        <div>
            {
                loadingIcon && <p>
                    Loading...
                </p>
            } 
           <div className="flex items-center justify-center min-h-screen border-solid">
                <div className="p-10 rounded-lg shadow-lg w-[350px] h-[300px] text-center">
                    <form method="post" onSubmit={loginOperation}>
                        <h1 className="text-2xl font-bold">Login Page</h1>
                        <div className="sm:col-span-4 mt-3">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                            <div className="mt-2">
                                <input type="email" onChange={(e)=>setInputs({...inputs, email: e.target.value})} value={inputs.email} autoComplete="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                            </div>
                        </div>
                        <div className="sm:col-span-4">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            <div className="mt-2">
                                <input type="password" onChange={(e)=>setInputs({...inputs, password: e.target.value})} value={inputs.password} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                            </div>
                        </div>
                        <div className="sm:col-span-4 mt-3 text-center block">
                            <button className="bg-gray-800 text-white p-2 rounded" type="submit">Login</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
}

export default Login;