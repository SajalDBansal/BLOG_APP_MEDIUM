import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";

export const Blogs = () => {
    const { loading, blogs } = useBlogs();
    if (loading) {
        return (
            <div>
                <Appbar />
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
            </div>
        )
    }

    return (
        <div>
            <Appbar />
            <div className="flex justify-center">
                <div className="max-w-xl">
                    {blogs.map((b) =>
                        <BlogCard
                            id={b.id}
                            authorName={b.author.name || "Anonymous"}
                            title={b.title}
                            content={b.content}
                            publishedDate={"2nd Feb 2025"} />
                    )}
                </div>
            </div>
        </div>
    )
}