"use client";
import { RootState } from "@/app/Redux/store";
import BlogTypes from "@/Types/Blog.types";
import CategoryTypes from "@/Types/Category.types";
import CommentTypes from "@/Types/Comment.types";
import UserTypes from "@/Types/User.types";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";

const schema = yup.object().shape({
    comment: yup.string().min(3).required()
});

const apiLink = process.env.apiLink;
const DetailComponent = ({blog, category, user, comments} : {blog: BlogTypes, category: CategoryTypes, user: Array<UserTypes>, comments: Array<CommentTypes>}) => {
    const imageLink = process.env.imageLink;
        
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    });

    const auth = useSelector((state:RootState)=>state.auth.value);
    const [loadingIcon, setLoadingIcon] = useState(false);
    const router = useRouter();
    
    
    useEffect(()=>{
        (async()=>{
            if (blog && category && user && comments) {
                setLoadingIcon(false);
            } else{
                setLoadingIcon(true);
            }

        })()
    }, [blog, category, comments, user]);

    const handleCommentSubmit = async(data:{comment: string}) =>{
        try {
            
            if (!auth.isAuth) {
                return router.push("/login");
            }

            await axios.post(`${apiLink}/blogs/addcomment/`+blog.id, {
                comment: data.comment,
                    userId: jwtDecode<{userId: 0}>(auth.token).userId,
            });

            return toast("Yorumunuz Kontrol sürecine alındı.\nEn Kısa zamanda Yayınlanacaktır.", {autoClose:3000, pauseOnHover:false, theme: "dark", position: "bottom-right"});
        } catch (error) {
            return toast("Unknown Error; "+error, {autoClose: 3000, theme: "dark", position: "bottom-right"});
        }
    };
    return (
        <>
            {
                loadingIcon && 
                <Image src={`/loadingLogo.svg`} width={100} height={100} alt=""></Image>
            }
            <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased text-white">
            {
                blog && <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
                    <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
                        <header className="mb-4 lg:mb-6 not-format">
                            {
                                user && user.map((u:UserTypes)=>u.id == blog.userId &&(
                                    <address className="flex items-center mb-6 not-italic" key={u.id}>
                                        <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                                            <Image className="mr-4 rounded-full" width={64} height={64} src={u.avatar_url ? `${imageLink}/${u.avatar_url}` : "profileavatar.jpg"} alt="" />
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
                                <figure><Image src={blog.fileUrl ? `${imageLink}/`+blog.fileUrl : "/notfound.png"} width={672} height={350} alt="" className="rounded-lg  bg-gray-800" style={{objectFit: "fill"}} />
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
                            {
                                blog.tags[0] && 
                                <>
                                    <h3 className="text-center mt-8 mb-4 text-lg lg:text-2xl font-bold">Tags</h3>
                                    <div className="mt-4 mb-4 p-5 bg-slate-950 rounded-lg" style={{height: "150px"}}>
                                        {
                                            blog.tags && blog.tags.map((t:any, index:number)=>(
                                                <span key={index} className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">{t}</span>
                                            ))
                                        }
                                    </div>
                                </>
                            }
                            
                        <section className="not-format">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white mt-6">Comments</h2>
                            </div>
                            <form className="mb-6" onSubmit={handleSubmit(handleCommentSubmit)}>
                                <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                                    <label htmlFor="comment" className="sr-only">Your comment</label>
                                    <textarea id="comment" rows={6} {...register("comment")}
                                        className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                                        placeholder="Write a comment..."></textarea>
                                        {errors.comment && <p className="text-red-700">*{errors.comment.message}</p>}
                                </div>
                                <button type="submit" className="bg-blue-700 p-2 rounded">
                                    Send
                                </button>
                            </form>
                            {
                                comments && comments.map((c:CommentTypes)=>c.blogId == blog.id &&(
                                    <article className="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900" key={c.blogId}>
                                        <footer className="flex justify-between items-center mb-2">
                                            <div className="flex items-center">
                                                {
                                                    user && user.filter((u:UserTypes)=>u.id == c.userId).map((a:UserTypes)=>(
                                                        <>
                                                            <p className="inline-flex items-center mr-3 font-semibold text-sm text-gray-900 dark:text-white"><Image
                                                                className="mr-2 w-6 h-6 rounded-full"
                                                                width={24}
                                                                height={24}
                                                                src={a.avatar_url ? `${imageLink}/${a.avatar_url}` : "/profileavatar.jpg"}
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
        </>
    );
}

export default DetailComponent;