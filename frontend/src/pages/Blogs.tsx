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




const blogData = [
    {
        authorName: "Sajaldbansal",
        title: "Getting Started with React",
        content: "React is a popular JavaScript library for building user interfaces. In this blog post, we'll explore the fundamentals of React, including components, props, and state management. We'll also look at some best practices and common patterns used in React development.",
        publishedDate: "2nd Feb 2025"
    },
    {
        authorName: "johndoe",
        title: "TypeScript Best Practices",
        content: "TypeScript adds static typing to JavaScript, making it more robust and maintainable. This post covers essential TypeScript features, common pitfalls to avoid, and how to effectively use TypeScript in your projects. We'll explore interfaces, types, and advanced concepts.",
        publishedDate: "1st Feb 2025"
    },
    {
        authorName: "alicesmith",
        title: "Modern CSS Techniques",
        content: "Discover the latest CSS features and techniques that can enhance your web development workflow. From CSS Grid to Custom Properties, we'll explore how modern CSS can help you create more maintainable and flexible layouts.",
        publishedDate: "31st Jan 2025"
    }
];
