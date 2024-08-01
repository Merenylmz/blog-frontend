"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const PolicyComponent = ({policies}: {policies: any}) => {
    const [loadingIcon, setLoadingIcon] = useState(false);
    const [policy, setPolicy] = useState(policies)

    useEffect(()=>{
        if (policy) {
            setLoadingIcon(false);
        } else { setLoadingIcon(true) }
    }, [policy]);
    return (
        <>
            <div className="w-full p-4 text-center bg-gray-800 border border-gray-500 rounded-lg shadow sm:p-8 dark:border-gray-800 mt-10">
            {
                loadingIcon &&
                <Image width={48} height={48} src={`/policyLoadinglogo.svg`} alt="loading..."></Image>
            }
            {
                policy && 
                <>
                        <h5 className="mb-3 text-3xl font-bold text-gray-900 dark:text-white">{policy.title}</h5>
                        <p className="mb-5 text-base text-white">{policy.description}</p>
                        <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
                            <a href="https://github.com/Merenylmz" target="_blank" className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                                <Image width={28} height={28} alt="a"  className="me-3 w-7 h-7 rounded-full" src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png"></Image>
                                <div className="text-left rtl:text-right">
                                    <div className="mb-1 text-xs">This is My Github</div>
                                    <div className="-mt-1 font-sans text-sm font-semibold">Github</div>
                                </div>
                            </a>
                            <a href="https://www.linkedin.com/in/m-eren-yılmaz-4127b1261/" target="_blank" className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                                <Image width={28} height={28} alt="" src="https://images.template.net/100611/linkedin-social-icon-clipart-pr1o8.jpg" className="me-3 w-7 h-7 rounded-full"></Image>
                                <div className="text-left rtl:text-right">
                                    <div className="mb-1 text-xs">This is My Linkedin</div>
                                    <div className="-mt-1 font-sans text-sm font-semibold">Linkedin</div>
                                </div> 
                            </a>
                        </div>
                </>
            }
            </div>
        </>
    );
}

export default PolicyComponent;