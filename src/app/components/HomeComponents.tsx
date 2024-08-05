"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { RootState } from "@/app/Redux/store";
import CommonAPI from "@/Helpers/CommonAPI";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

import BlogTypes from "@/Types/Blog.types";
import CategoryTypes from "@/Types/Category.types";


const HomeComponents = ({blog, category, apiLink}: {blog: {blogs: BlogTypes[]}, category: Array<CategoryTypes>, apiLink: string}) => {
    const auth = useSelector((state: RootState) => state.auth.value);
    const imageLink = process.env.imageLink;
    const router = useRouter();
    const queryStr = useSearchParams();

    const [blogs, setBlogs] = useState(blog.blogs);
    const [categories, setCategories] = useState(category);

    const [loadingIcon, setLoadingIcon] = useState(false);
    const [selectedBox, setSelectedBox] = useState<string[]>(queryStr.getAll("category"));

    const handleCategorySubmit = async() =>{
        setBlogs([]);
        setLoadingIcon(true);
    
        let query = selectedBox.map((id)=>`category=${id}`).join('&');
        router.push(`/?${query}`);
        
        const res = await CommonAPI({url: `${apiLink}/blogs/category`, method: "ADD", inputs: {
            categories: selectedBox
        }});
        console.log(res);
        
        setBlogs(res.data.blogs);
        setLoadingIcon(false);
    };
    
    const changeSelected = (e:{target:{checked: boolean, value: any}}) =>{

        let value = e.target.checked ? e.target.value : '';
        
        setSelectedBox((prevValues) => {
            let updatedValues = prevValues.slice();
            if (e.target.checked) {
                updatedValues.push(value);
            } else {
                const index = updatedValues.findIndex((a)=>a == e.target.value);
                updatedValues.splice(index, 1);
            }
            return updatedValues;
        });

        
    }

    useEffect(()=>{
        if (blogs && categories) {
            setLoadingIcon(false);
        } else {setLoadingIcon(true);}
    }, [blogs, categories]);

    useEffect(() => {
        if (queryStr.get("category")) {
            (async()=>{
                await handleCategorySubmit();
            })()
        }
    
    }, [queryStr.get("category")])

    return (
        <div>
            <form className="mt-4">
                <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    {
                    categories && categories.map((c:any)=>(
                        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600" key={c.id}>
                        <div className="flex items-center ps-3">
                            <input
                            id="categoryCheck"
                            type="checkbox"
                            value={c.id}
                            onChange={changeSelected}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label
                            htmlFor="vue-checkbox-list"
                            className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                            {c.title}
                            </label>
                        </div>
                        </li>
                    ))
                    }
                    <li className="w-full border-b border-gray-500 sm:border-b-0 sm:border-r dark:border-gray-900 text-center">
                        <button className="bg-gray-700 p-3 rounded" onClick={handleCategorySubmit} type="button">Listele</button>
                    </li>
                </ul>
            </form>

            <div className="mx-auto">
                {loadingIcon ? (
                    <Image src={`/loadingLogo.svg`} width={100} height={100} alt=""></Image>
                ) : (
                <></>
                )}
            </div> 
            <div className="flex flex-wrap">
                {blogs && blogs[0] &&  
                blogs.map((b:BlogTypes) => (
                    <div className="mt-6 me-4 w-[350px] h-[150px] mb-40" key={b.id}>
                    <Link href={`${b.slug}`}>
                        <Image src={b.fileUrl ? `${imageLink}/`+b.fileUrl : "/notfound.png"} alt="" width={350} height={200} className="w-[350px] h-[200px] rounded-t-lg hover:opacity-50"/>
                        <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {b.title}
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            {b.description && b.description.substr(0, 35)}
                        </p>
                        </div>
                    </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HomeComponents;