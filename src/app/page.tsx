"use client";
import { login } from "@/Redux/Features/AuthSlice";
import { RootState } from "@/Redux/store";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import "./globals.css";
import { useEffect, useState } from "react";
import { getAllBlogs } from "@/Redux/actions/BlogAction";
import Link from "next/link";
import { getAllCategories } from "@/Redux/actions/CategoryActions";
import { useRouter } from "next/navigation";
import axios from "axios";

interface IBlog {
  id: number;
  title: string;
  description: string;
  fileUrl: string;
  categoryId: number;
}
export default function Home() {
  const auth = useSelector((state: RootState) => state.auth.value);
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [loadingIcon, setLoadingIcon] = useState(false);
  const [categories, setCategories] = useState([{ title: "", id: 0 }]);
  const [selectedBox, setSelectedBox] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      setBlogs([]);
      setLoadingIcon(true);
      const blogs = await getAllBlogs();
      setLoadingIcon(false);
      setBlogs(blogs);
      const category = await getAllCategories();
      setCategories(category);
    })();
  }, []);

  const handleCategorySubmit = async(e:any) =>{
    e.preventDefault();
    setBlogs([]);
     
    const response = await axios.post("http://localhost:8181/api/blogs/category", {
      categories: selectedBox
    });
    const data = response.data;
    setBlogs(data.blogs);    
  };

  const changeSelected = (e:any) =>{

    let value = e.target.checked ? e.target.value : '';
    
    setSelectedBox((prevValues) => {
      let updatedValues = prevValues.slice();
      if (e.target.checked) {
        updatedValues.push(Number.parseInt(value));
      } else {
        const index = updatedValues.findIndex((a)=>a == e.target.value);
        updatedValues.splice(index, 1);
      }
      return updatedValues;
    });
    

    
    // setSelected();
  }
  return (
    <div className="container mx-auto">
      <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
        Identification
      </h3>
        <form method="post" onSubmit={handleCategorySubmit}>
      <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        {
          categories && categories.map(c=>(
            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600" key={c.id}>
              <div className="flex items-center ps-3">
                <input
                  id="categoryCheck"
                  type="checkbox"
                  value={c.id}
                  onChange={changeSelected}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
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
          <button className="bg-gray-700 p-3 rounded" type="submit">Listele</button>
        </li>
      </ul>
        </form>

      <div className="mx-auto">
        {loadingIcon ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 200"
            className="w-[100px] h-[100px]"
          >
            <circle
              fill="#161270"
              stroke="#161270"
              stroke-width="12"
              r="15"
              cx="40"
              cy="100"
            >
              <animate
                attributeName="opacity"
                calcMode="spline"
                dur="1.2"
                values="1;0;1;"
                keySplines=".5 0 .5 1;.5 0 .5 1"
                repeatCount="indefinite"
                begin="-.4"
              ></animate>
            </circle>
            <circle
              fill="#161270"
              stroke="#161270"
              stroke-width="12"
              r="15"
              cx="100"
              cy="100"
            >
              <animate
                attributeName="opacity"
                calcMode="spline"
                dur="1.2"
                values="1;0;1;"
                keySplines=".5 0 .5 1;.5 0 .5 1"
                repeatCount="indefinite"
                begin="-.2"
              ></animate>
            </circle>
            <circle
              fill="#161270"
              stroke="#161270"
              stroke-width="12"
              r="15"
              cx="160"
              cy="100"
            >
              <animate
                attributeName="opacity"
                calcMode="spline"
                dur="1.2"
                values="1;0;1;"
                keySplines=".5 0 .5 1;.5 0 .5 1"
                repeatCount="indefinite"
                begin="0"
              ></animate>
            </circle>
          </svg>
        ) : (
          <></>
        )}
      </div> 
      <div className="flex flex-wrap">
        {blogs[0] &&
          blogs.map((b) => (
            <div className="mt-6 me-4 w-[350px] h-[150px] mb-40" key={b.id}>
              <Link href={`${b.id}`}><img src={`http://localhost:8181/storage/`+b.fileUrl} alt="" className="h-[200px] w-[350px] rounded"/></Link>
              <Link
                href={`${b.id}`}
                className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {b.title}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">

                  {b.description && b.description.substr(0, 35)}
                </p>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
