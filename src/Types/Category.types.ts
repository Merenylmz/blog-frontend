import BlogTypes from "./Blog.types";

type CategoryTypes = {
    id: number,
    title: string,
    blogs: BlogTypes[],
    slug: string
}

export default CategoryTypes;