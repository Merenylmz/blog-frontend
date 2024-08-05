import CommentTypes from "./Comment.types";
type BlogTypes = {
    id: number,
    title: string,
    description: string,
    fileUrl: string,
    slug: string,
    userId: number,
    isitActive: boolean,
    categoryId: number,
    comments: CommentTypes[],
    tags: any[],
    viewsCount: number
};

export default BlogTypes;
