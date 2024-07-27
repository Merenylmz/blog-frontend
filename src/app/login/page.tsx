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
        if (response.data.status != "OK") {
            setLoadingIcon(false);
            return alert("Try Again :)");
        }
        console.log(response[0]);
        
        dispatch(login({token:response.token, profilePhoto: response[0]}));
        setLoadingIcon(false);
        response.data.status == "OK" && router.push("/");
    };
    return (
        <div>
            {
                loadingIcon && <p>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-[100px] h-[100px]" viewBox="0 0 200 200"><circle fill="#383EFF" stroke="#383EFF" stroke-width="13" r="15" cx="40" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#383EFF" stroke="#383EFF" stroke-width="13" r="15" cx="100" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#383EFF" stroke="#383EFF" stroke-width="13" r="15" cx="160" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>
                </p>
            } 
           <div className="flex items-center justify-center min-h-screen border-solid">
                <div className="p-10 rounded-lg shadow-lg shadow-slate-800 w-[350px] h-[300px] text-center border-2 border-gray-700">
                    <form method="post" onSubmit={loginOperation}>
                        <h1 className="text-2xl font-bold text-white">Login Page</h1>
                        <div className="sm:col-span-4 mt-3">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">Email address</label>
                            <div className="mt-2">
                                <input type="email" onChange={(e)=>setInputs({...inputs, email: e.target.value})} value={inputs.email} autoComplete="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                            </div>
                        </div>
                        <div className="sm:col-span-4">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">Password</label>
                            <div className="mt-2">
                                <input type="password" onChange={(e)=>setInputs({...inputs, password: e.target.value})} value={inputs.password} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                            </div>
                        </div>
                        <div className="sm:col-span-4 mt-3 text-center block">
                            <button className="bg-gray-900 text-white p-2 rounded border-2 border-gray-600" type="submit">Login</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
}

export default Login;
