import axios from "axios";

export const loginTask = async(data: any) =>{
    
    const response = await axios.post("http://localhost:8181/api/auth/login", data);
    const resData = response.data;
    
    return resData;
};
export const registerTask = async(data: any) =>{
    const response = await axios.post("http://localhost:8181/api/auth/register", data);
    const resData = response.data;
    
    return resData;
};
export const logoutTask = async(token: any) =>{
    console.log("Sign Outing");
    
    const response = await axios.get("http://localhost:8181/api/auth/logout?token="+token);
    const resData = response.data;

    return resData;
};