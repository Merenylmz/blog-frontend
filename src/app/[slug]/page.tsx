
import DetailComponent from "@/app/components/DetailComponent";
import CommonAPI from "@/Helpers/CommonAPI";

const Details = async({params}: {params: {slug:string}}) => {
    
    const blog = params.slug && await CommonAPI({url: `${process.env.apiLink}/blogs/${params.slug}`, method: "GET"});
    const user = await CommonAPI({url:`${process.env.apiLink}/auth/allusers`, method: "GET"});
    const category = blog && await CommonAPI({url:`${process.env.apiLink}/categories/${blog.categoryId}`, method: "GET"});
    const comments = await CommonAPI({url: `${process.env.apiLink}/comments`, method: "GET"})

    return (
        <div>
            <DetailComponent blog={blog[0]} user={user} category={category} comments={comments.comments} />
        </div>
    );
}

export default Details;
