"use client";

import { RootState } from "@/Redux/store";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useParams, useRouter } from "next/navigation";
import { comment } from "postcss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useSWR from "swr";

const blogFetcher = (url: string) => axios.get(url).then(res=>res.data[0]);
const categoryFetcher = (url: string) => axios.get(url).then(res=>res.data);

const Details = () => {
    
    const {id} = useParams();
    const {data: blog, error: blogError} = useSWR(`http://localhost:8181/api/blogs/${id}`, blogFetcher);
    const {data: user, error: userError} = useSWR("http://localhost:8181/api/auth/allusers", (url: string)=>axios.get(url).then(res=>res.data));
    const {data: comments, error: commentError} = useSWR("http://localhost:8181/api/comments", (url: string)=>axios.get(url).then(res=>res.data.comments));
    const {data: category, error: categoryError} = useSWR(blog ? `http://localhost:8181/api/categories/${blog.categoryId}` : null, categoryFetcher);
    
    
    
    const auth = useSelector((state:RootState)=>state.auth.value);
    const [loadingIcon, setLoadingIcon] = useState(false);
    const router = useRouter();
    
    
    useEffect(()=>{
        (async()=>{
            if (blog && category && user && comments) {
                setLoadingIcon(false);
                await axios.get(`http://localhost:8181/api/blogs/count/${blog.id}`);
            } else{
                setLoadingIcon(true);
            }

        })()
    }, [blog, category, comments, user]);

    const handleCommentSubmit = async(e:any) =>{
        try {
            e.preventDefault();

            if (!auth.isAuth) {
                return router.push("/login");
            }
            console.log(e.target.comment.value);
            console.log(jwtDecode<{userId: 0}>(auth.token).userId);
            

            const response = await axios.post("http://localhost:8181/api/blogs/addcomment/"+blog.id, {
                comment: e.target.comment.value,
                userId: jwtDecode<{userId: 0}>(auth.token).userId,
            });

            e.target.comment.value = "";
            alert("Yorumunuz Kontrol Sürecine Alındı. \nEn Kısa zamanda kontrol Edilip Yayınlanıcak \n:)");
        } catch (error) {
            console.log(error);
            
        }
    };
    return (
        <div>
            {
                loadingIcon && 
                <svg xmlns="http://www.w3.org/2000/svg" className="w-[100px] h-[100px]" viewBox="0 0 200 200"><circle fill="#383EFF" stroke="#383EFF" stroke-width="13" r="15" cx="40" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#383EFF" stroke="#383EFF" stroke-width="13" r="15" cx="100" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#383EFF" stroke="#383EFF" stroke-width="13" r="15" cx="160" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>
            }
        <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased text-white">
            {
                blog && <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
                    <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
                        <header className="mb-4 lg:mb-6 not-format">
                            {
                                user && user.map((u:any)=>u.id == blog.userId &&(
                                    <address className="flex items-center mb-6 not-italic" key={u.id}>
                                        <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                                            <img className="mr-4 w-16 h-16 rounded-full" src={`http://localhost:8181/storage/${u.avatar_url}`} alt="Jese Leos" />
                                            <div>
                                                <a href="#" rel="author" className="text-xl font-bold text-gray-900 dark:text-white">{u.name}</a>
                                                <p className="text-base text-gray-500 dark:text-gray-400">{u.bioTxt}</p>
                                            </div>
                                        </div>
                                    </address>
                                ))
                            }
                            <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">{blog.title}</h1>
                        </header>
                            <p className="lead mb-3">
                                {blog.description}
                            </p>
                        
                            {
                                blog.fileUrl != null && 
                                <figure><img src={"http://localhost:8181/storage/"+blog.fileUrl} className="rounded-lg  bg-gray-800" style={{width: "672px", height: "350px", objectFit: "fill"}} />
                                </figure>
                            }
                            <figcaption></figcaption>
                            {
                                category && category.id != 0 && 
                                <div className="mt-6 mb-5 items-center" style={{display: "flex", justifyContent: "space-around"}}>
                                    <h3 className="font-semibold">Category: {category.title}</h3>
                                    <h3 className="font-semibold">Views Count: {blog.viewsCount}</h3> 
                                </div>
                            }
                            <h3 className="text-center mt-8 mb-4 text-lg lg:text-2xl font-bold">Tags</h3>
                            <div className="mt-4 mb-4 p-5 bg-slate-950 rounded-lg" style={{height: "150px"}}>
                                {
                                    blog.tags && blog.tags.map((t:any, index:number)=>(
                                        <span key={index} className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">{t}</span>
                                    ))
                                }
                            </div>
                        <section className="not-format">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white mt-6">Comments</h2>
                            </div>
                            <form className="mb-6" onSubmit={handleCommentSubmit}>
                                <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                                    <label htmlFor="comment" className="sr-only">Your comment</label>
                                    <textarea id="comment" rows={6}
                                        className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                                        placeholder="Write a comment..." required></textarea>
                                </div>
                                <button type="submit" className="bg-blue-700 p-2 rounded">
                                    Send
                                </button>
                            </form>
                            {
                                comments && comments.map((c:any)=>c.blogId == blog.id &&(
                                    <article className="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900" key={c.blogId}>
                                        <footer className="flex justify-between items-center mb-2">
                                            <div className="flex items-center">
                                                {
                                                    user && user.filter((u:any)=>u.id == c.userId).map((a:any)=>(
                                                        <>
                                                            <p className="inline-flex items-center mr-3 font-semibold text-sm text-gray-900 dark:text-white"><img
                                                                className="mr-2 w-6 h-6 rounded-full"
                                                                src={`http://localhost:8181/storage/${a.avatar_url}`}
                                                                alt="Michael Gough" />{a.name}</p>
                                                            <p className="text-sm text-gray-600 dark:text-gray-400"></p>
                                                        </>
                                                    )) 
                                                }
                                                
                                            </div>
                                            <button id="dropdownComment1Button" data-dropdown-toggle="dropdownComment1"
                                                className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:text-gray-400 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                                type="button">
                                                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                                        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                                                    </svg>
                                            </button>
                                        </footer>
                                        <p>{c.comment}</p>
                                        <div className="flex items-center mt-4 space-x-4">
                                            <button type="button"
                                                className="flex items-center font-medium text-sm text-gray-500 hover:underline dark:text-gray-400">
                                                Report !
                                            </button>
                                        </div>
                                    </article>
                                ))
                            }
                        </section>
                    </article>
                </div>
            }
        
    </main>
    </div>
    );
}

export default Details;