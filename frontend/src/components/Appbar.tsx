import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"

export const Appbar = () => {
    return (
        <div className="border-b flex justify-between px-10 py-4">

            <div className="font-bold flex flex-col justify-center text-2xl cursor-pointer">
                <Link to={'/blogs'}>
                    Medium
                </Link>
            </div>

            <div>
                <Link to={`/publish`}>
                    <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-xl text-sm px-5 py-2.5 me-2 mb-2 mr-4">New</button>
                </Link>

                <Avatar name={"Sajal"} size={"big"} />
            </div>

        </div>
    )
}