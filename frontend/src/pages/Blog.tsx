import { useParams } from "react-router-dom";
import { useBlog } from "../hooks"
import { FullBlog } from "../components/FulBlog";
import { Spinner } from "../components/Spinner";
import { Appbar } from "../components/Appbar";

export const Blog = () => {
    const { id } = useParams();

    const { loading, blog } = useBlog({ id: id || "" });
    if (loading || !blog) {
        return (
            <div>
                <Appbar />
                <Spinner />
            </div>
        )
    }

    return (
        <div>
            <FullBlog blog={blog} />
        </div>
    )
}