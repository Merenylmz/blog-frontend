"use client";
import { registerTask } from "@/app/Redux/actions/AuthActions";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";

const schema = yup.object().shape({
    name: yup.string().min(2, "Please give long name than 3 letters").required(),
    email: yup.string().required("Email is Required").email("Please enter valid email"),
    password: yup.string().required()
});

const Register = () => {
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState({name: "", email: "", password: ""});
    const [loadingIcon, setLoadingIcon] = useState(false);
    const router = useRouter();

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    });

    const registerOperation = async(e:any) =>{
        setLoadingIcon(true);
        const response = await registerTask(inputs);
        setLoadingIcon(false);
        response.status == "OK" ? router.push("/login") : alert("Try Again :)\n"+response.msg);
    };
    return (
        <div>
            {
                loadingIcon && <p>
                    <Image src={`/loadingLogo.svg`} width={100} height={100} alt=""></Image>
                </p>
            } 
           <div className="flex items-center justify-center min-h-screen border-solid text-white">
                <div className="p-10 rounded-lg shadow-lg shadow-slate-800 w-[350px] text-center border-2 border-gray-700 ">
                    <form method="post" onSubmit={handleSubmit(registerOperation)}>
                        <h1 className="text-2xl font-bold ">Register Page</h1>
                        <div className="sm:col-span-4 mt-3">
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-white">Username</label>
                            <div className="mt-2">
                                <input type="text" {...register("name")} onChange={(e)=>setInputs({...inputs, name: e.target.value})} value={inputs.name} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                            </div>
                            {errors.name && <p className="text-red-700">*{errors.name.message}</p>}
                        </div>
                        <div className="sm:col-span-4 mt-3">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">Email address</label>
                            <div className="mt-2">
                                <input type="email" {...register("email")} onChange={(e)=>setInputs({...inputs, email: e.target.value})} value={inputs.email} autoComplete="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                            </div>
                            {errors.email && <p className="text-red-700">*{errors.email.message}</p>}
                        </div>
                        <div className="sm:col-span-4">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">Password</label>
                            <div className="mt-2">
                                <input type="password" {...register("password")} onChange={(e)=>setInputs({...inputs, password: e.target.value})} value={inputs.password} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                            </div>
                            {errors.password && <p className="text-red-700">*{errors.password.message}</p>}
                        </div>
                        <div className="sm:col-span-4 mt-3 text-center block">
                            <button className="bg-gray-800 text-white p-2 rounded border-gray-600" type="submit">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;