"use client";
import { registerTask } from "@/Redux/actions/AuthActions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

const Register = () => {
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState({name: "", email: "", password: ""});
    const [loadingIcon, setLoadingIcon] = useState(false);
    const router = useRouter();
    const registerOperation = async(e:any) =>{
        e.preventDefault();
        setLoadingIcon(true);
        const response = await registerTask(inputs);
        setLoadingIcon(false);
        response.status == "OK" ? router.push("/login") : alert("Try Again :)");
    };
    return (
        <div>
            {
                loadingIcon && <p>
                    Loading...
                </p>
            } 
           <div className="flex items-center justify-center min-h-screen border-solid">
                <div className="p-10 rounded-lg shadow-lg w-[350px] text-center">
                    <form method="post" onSubmit={registerOperation}>
                        <h1 className="text-2xl font-bold">Register Page</h1>
                        <div className="sm:col-span-4 mt-3">
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
                            <div className="mt-2">
                                <input type="text" onChange={(e)=>setInputs({...inputs, name: e.target.value})} value={inputs.name} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                            </div>
                        </div>
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
                            <button className="bg-gray-800 text-white p-2 rounded" type="submit">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;