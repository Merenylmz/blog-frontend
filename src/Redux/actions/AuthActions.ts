import axios from "axios";

export const loginTask = async(data: any) =>{
    
    const response = await axios.post(`${process.env.apiLink}/auth/login`, data);
    const resData = response.data;
    
    return resData;
};
export const registerTask = async(data: any) =>{
    const response = await axios.post(`${process.env.apiLink}/auth/register`, data);
    const resData = response.data;
    
    return resData;
};
export const logoutTask = async(token: any) =>{
    
    const response = await axios.get(`${process.env.apiLink}/auth/logout?token=`+token);
    const resData = response.data;

    return resData;
};