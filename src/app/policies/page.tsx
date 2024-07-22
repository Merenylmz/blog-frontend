"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";

const privacyPolicyFetcher = (url: string) => axios.get(url).then(res=>res.data);
const PrivacyPolicy = () => {
    const {data: privacy, error} = useSWR("http://localhost:8181/api/privacy", privacyPolicyFetcher);
    const [loadingIcon, setLoadingIcon] = useState(false);

    useEffect(()=>{
        if (privacy) {
            setLoadingIcon(false);
            
        } else {setLoadingIcon(true);}
    }, [privacy]);
    return (
        <div>
            <div className="w-full p-4 text-center bg-gray-800 border border-gray-500 rounded-lg shadow sm:p-8 dark:border-gray-800 mt-10">
            {
                loadingIcon &&
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 150" className="w-12 h-12"><path fill="none" stroke="#FFFFFF" stroke-width="18" stroke-linecap="round" stroke-dasharray="300 385" stroke-dashoffset="0" d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z"><animate attributeName="stroke-dashoffset" calcMode="spline" dur="2" values="685;-685" keySplines="0 0 1 1" repeatCount="indefinite"></animate></path></svg>
            }
            {
                privacy && 
                <>
                    <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">{privacy.title}</h5>
                    <p className="mb-5 text-base text-white sm:text-lg ">{privacy.description}</p>
                    <Link href="policies/kvkk" className="mb-3 mt-3 text-white hover:text-gray-500">KVKK Document</Link>
                    <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
                        <a href="https://github.com/Merenylmz" className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                            <img className="me-3 w-7 h-7 rounded-full" src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png" />
                            <div className="text-left rtl:text-right">
                                <div className="mb-1 text-xs">This is My Github</div>
                                <div className="-mt-1 font-sans text-sm font-semibold">Github</div>
                            </div>
                        </a>
                        <a href="https://www.linkedin.com/in/m-eren-yılmaz-4127b1261/" className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                            <img src="https://images.template.net/100611/linkedin-social-icon-clipart-pr1o8.jpg" className="me-3 w-7 h-7 rounded-full" />
                            <div className="text-left rtl:text-right">
                                <div className="mb-1 text-xs">This is My Linkedin</div>
                                <div className="-mt-1 font-sans text-sm font-semibold">Linkedin</div>
                            </div>
                        </a>
                    </div>
                </>
            }
            </div>
           

        </div>
    );
}

export default PrivacyPolicy;