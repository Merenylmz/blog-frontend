"use client";
import { login } from "@/Redux/Features/AuthSlice";
import { RootState } from "@/Redux/store";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import "./globals.css";
import { useEffect, useState } from "react";
import { getAllBlogs } from "@/Redux/actions/BlogAction";
import Link from "next/link";

interface IBlog {
  id: number,
  title: string,
  description: string
}
export default function Home() {
  const auth = useSelector((state:RootState)=>state.auth.value);
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [loadingIcon, setLoadingIcon] = useState(false);

  useEffect(()=>{
    (async()=>{
      setBlogs([]);
      setLoadingIcon(true)
      const blogs = await getAllBlogs();
      setLoadingIcon(false);
      setBlogs(blogs);
    })()
  }, []);
  return (
    <div className="container mx-auto">
      <div className="mx-auto">
      {
        loadingIcon ? 
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-[100px] h-[100px]"><circle fill="#161270" stroke="#161270" stroke-width="12" r="15" cx="40" cy="100"><animate attributeName="opacity" calcMode="spline" dur="1.2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#161270" stroke="#161270" stroke-width="12" r="15" cx="100" cy="100"><animate attributeName="opacity" calcMode="spline" dur="1.2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#161270" stroke="#161270" stroke-width="12" r="15" cx="160" cy="100"><animate attributeName="opacity" calcMode="spline" dur="1.2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>
        :<></>
      }
      </div>
      <div className="flex flex-wrap">
        {blogs[0] && blogs.map(b=>(
          <div className="mt-6 me-4 w-[350px] h-[150px]" key={b.id}>
            <Link href={`${b.id}`} className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{b.title}</h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">{b.description}</p>
            </Link>
          </div>
        ))}
        
      </div>
    </div>
  );
}
