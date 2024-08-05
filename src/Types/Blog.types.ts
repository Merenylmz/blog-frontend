type BlogTypes = {
    id: number,
    title: string,
    description: string,
    fileUrl: string,
    slug: string,
    userId: number,
    isitActive: boolean,
    categoryId: number,
    comments: any[],
    tags: any[],
    viewsCount: number
};

export default BlogTypes;