
import DetailComponent from "@/app/components/DetailComponent";
import CommonAPI from "@/Helpers/CommonAPI";
import { Metadata } from "next";
import Head from "next/head";
import HeadComponent from "../head";

const Details = async({params}: {params: {slug:string}}) => {
    
    const blog = params.slug && await CommonAPI({url: `${process.env.apiLink}/blogs/${params.slug}`, method: "GET"});
    const user = await CommonAPI({url:`${process.env.apiLink}/auth/allusers`, method: "GET"});
    const category = await CommonAPI({url:`${process.env.apiLink}/categories/${blog.data.categoryId}`, method: "GET"});
    const comments = await CommonAPI({url: `${process.env.apiLink}/comments`, method: "GET"})

    return (
        <>
            <HeadComponent title={blog.data.title+" - Details"}/>
            <div>
                <DetailComponent blog={blog.data} user={user.data} category={category.data} comments={comments.data.comments} />
            </div>
        </>
    );
}

export default Details;
