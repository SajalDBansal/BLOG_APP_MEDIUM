import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

interface Blog {
    "id": string,
    "title": string,
    "content": string,
    "published": boolean,
    "authorId": string,
    "author": {
        "name": string
    }
}

export interface SingleBlog {
    "id": string,
    "title": string,
    "content": string,
    "published": boolean,
    "authorId": string,
    "author": {
        "name": string,
        "email": string
    }
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then((response) => {
                setBlogs(response.data);
                setLoading(false);
            })
    }, []);

    return {
        loading, blogs
    }
}

export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<SingleBlog>();

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then((response) => {
                setBlog(response.data);
                setLoading(false);
            })
    }, [id]);

    return {
        loading, blog
    }


}