import axios from "axios";

const apiLink = process.env.apiLink;

type LoginAndRegisterType = {
    name?: string,
    email: string,
    password: string
}

export const loginTask = async(data: LoginAndRegisterType) =>{
    const response = await axios.post(`${apiLink}/auth/login`, data);
    const resData = response.data;
    
    return resData;
};
export const registerTask = async(data: LoginAndRegisterType) =>{
    const response = await axios.post(`${apiLink}/auth/register`, data);
    const resData = response.data;
    
    return resData;
};
export const logoutTask = async(token: string) =>{
    
    const response = await axios.get(`${apiLink}/auth/logout?token=`+token);
    const resData = response.data;

    return resData;
};