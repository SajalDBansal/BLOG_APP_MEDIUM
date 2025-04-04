import { Circle } from "./BlogCard"

export const BlogSkeleton = () => {
    return (
        <div className="flex justify-center w-full">
            <div className="max-w-xl">
                <div role="status" className="animate-pulse">

                    <div className="p-4 border-b-1 border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">

                        <div className="flex">
                            <div className="h-6 w-48 bg-gray-200 rounded-full mb-4 "></div>
                            <div className="pl-2 flex flex-col justify-center">
                                <Circle />
                            </div>
                            <div className="pl-2 font-thin text-slate-500 text-sm flex flex-col justify-center">
                                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                            </div>
                        </div>
                        <div className="text-xl font-bold pt-2">
                            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                        </div>
                        <div className="text-md font-thin pt-1">
                            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                        </div>
                        <div className="text-slate-500 text-sm font-thin pt-4">
                            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                        </div>
                    </div>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </div>

    )
}