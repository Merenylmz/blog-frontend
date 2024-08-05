import BlogTypes from "./Blog.types";

type UserTypes = {
    id: number,
    name: string,
    email: string,
    password: string,
    bioTxt: string,
    profilePhoto: string,
    blogs: Array<BlogTypes>,
    avatar_url: string
};

export default UserTypes;