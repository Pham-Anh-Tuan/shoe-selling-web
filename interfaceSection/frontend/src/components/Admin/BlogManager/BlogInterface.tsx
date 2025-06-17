export interface Blog {
    id: string;
    title: string;
    thumbnailName: string;
    thumbnailFile: File | null;
    status: number;
    content: string;
    email: string;
}

export interface SumBlog {
    id: string;
    title: string;
    thumbnailName: string;
}

export interface BlogInf {
    title: string;
    content: string;
    createdAt: string;
}

export interface ManagerBlog {
    id: string;
    title: string;
    thumbnailName: string;
    status: number;
    createdAt: string;
}
