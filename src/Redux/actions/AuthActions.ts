import axios from "axios";

const apiLink = "http://localhost:8181/api";

export const loginTask = async(data: any) =>{
    
    const response = await axios.post(`${apiLink}/auth/login`, data);
    const resData = response.data;
    
    return resData;
};
export const registerTask = async(data: any) =>{
    const response = await axios.post(`${apiLink}/auth/register`, data);
    const resData = response.data;
    
    return resData;
};
export const logoutTask = async(token: any) =>{
    
    const response = await axios.get(`${apiLink}/auth/logout?token=`+token);
    const resData = response.data;

    return resData;
};