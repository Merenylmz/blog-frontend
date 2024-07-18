import axios from "axios";

export const getAllCategories = async() =>{
    const response = await axios.get("http://localhost:8181/api/categories");
    const data = response.data;

    return data;
};