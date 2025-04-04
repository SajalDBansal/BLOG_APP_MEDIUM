import { SingleBlog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"

export const FullBlog = ({ blog }: { blog: SingleBlog }) => {
    return (
        <div>
            <Appbar />
            <div className="flex justify-center">
                <div className="grid grid-cols-12 px-20 w-full max-w-screen-xl pt-15">
                    <div className="col-span-8">
                        <div className="text-5xl font-extrabold">
                            {blog.title}
                        </div>
                        <div className="text-slate-500 pt-4">
                            Posted on 2nd December 2023
                        </div>
                        <div className="pt-4 text-lg">
                            {blog.content}
                        </div>
                    </div>
                    <div className="col-span-4 pl-4">
                        <div className="text-lg">
                            Author
                        </div>
                        <div className="flex justify-evenly pt-5">
                            <div className="flex flex-col justify-center">
                                <Avatar name={blog.author.name || "Anonymous"} size={"big"} />
                            </div>
                            <div className="pl-3">
                                <div className="text-xl font-bold">
                                    {blog.author.name || "Anonymous"}
                                </div>
                                <div className="pt-2 text-slate-500">
                                    Random catch pharse about the author's ability to grab the user's attention
                                </div>

                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}