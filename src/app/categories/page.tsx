"use client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const Categories = () => {
    const {data} = useParams();   
    const [blogs, setBlogs] = useState([]);
    
    return (
        <div>
            
        </div>
    );
}

export default Categories;