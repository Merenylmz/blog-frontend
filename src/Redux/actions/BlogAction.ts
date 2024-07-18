import axios from "axios";

export const getAllBlogs = async() =>{
    const response = await axios.get("http://localhost:8181/api/blogs/popular");
    const data = response.data;

    
    return data.blogs;
};