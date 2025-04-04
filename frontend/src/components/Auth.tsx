import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { SinginInput, SingupInput } from "@sajaldbansal/medium-module"
import axios from "axios"
import { BACKEND_URL } from "../config"

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [signupInputs, setSignupInputs] = useState<SingupInput>({
        name: "",
        email: "",
        password: ""
    })

    const [signinInputs, setSigninInputs] = useState<SinginInput>({
        email: "",
        password: ""
    })

    async function sendRequest() {
        const route = type === "signup" ? "signup" : "signin";
        const data = type === "signup" ? signupInputs : signinInputs;
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${route}`, data);
            const jwt = response.data;
            localStorage.setItem("token", `Bearer ${jwt.jwt}`);
            navigate("/blogs");
        } catch (error) {
            // Log error
            console.log("error occured : ", error);
        }
    }

    return (
        <div className="h-screen flex flex-col justify-center">
            <div className="flex justify-center">
                <div>
                    <div className="px-10">
                        <div className="text-4xl font-bold">
                            {type === "signup" ? "Create an account" : "Signin with email"}

                        </div>
                        <div className="text-center text-slate-500 mt-2">
                            {type === "signup" ? "Already have an account?" : "Don't have an Account"}

                            <Link to={type === "signin" ? "/signup" : "/signin"} className="pl-2 underline">
                                {type === "signup" ? "Login" : "Signup"}

                            </Link>
                        </div>
                    </div>
                    <div className="pt-4">
                        {type === "signup" ?
                            <LabledInput
                                lable={"Username"}
                                placeholder={"Enter your name"}
                                onChange={(e) => { setSignupInputs({ ...signupInputs, name: e.target.value }) }}
                            />
                            : null}

                        <LabledInput
                            lable={"Email"}
                            type={"email"}
                            placeholder={"Enter your email Id"}
                            onChange={(e) => {
                                if (type === "signin") {
                                    setSigninInputs({ ...signinInputs, email: e.target.value })
                                } else {
                                    setSignupInputs({ ...signupInputs, email: e.target.value })
                                }
                            }}
                        />

                        <LabledInput
                            lable={"Password"}
                            type={"password"}
                            placeholder={"Create password"}
                            onChange={(e) => {
                                if (type === "signin") {
                                    setSigninInputs({ ...signinInputs, password: e.target.value })
                                } else {
                                    setSignupInputs({ ...signupInputs, password: e.target.value })
                                }
                            }}
                        />
                    </div>

                    <div className="pt-8">
                        <button
                            type="button"
                            className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                            onClick={sendRequest}
                        >
                            {type === "signup" ? "Sign up" : "Sign in"}
                        </button>
                    </div>

                </div>
            </div>
        </div >
    )
}

interface LabledInputType {
    lable: string,
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    type?: string
}

function LabledInput({ lable, placeholder, onChange, type }: LabledInputType) {
    return (
        <div className="pt-4">
            <label
                htmlFor="first_name"
                className="block mb-2 text-md font-semibold pt-2"
            >
                {lable}
            </label>
            <input
                onChange={onChange}
                type={type || "text"}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-black-500 block w-full p-3"
                placeholder={placeholder}
                required />
        </div>
    )
}