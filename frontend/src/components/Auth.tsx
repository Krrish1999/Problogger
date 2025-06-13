import { useState, type ChangeEvent } from "react"
import  { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { BACKEND_URL } from "../config"
import type { SignupInput } from "@krrish_5/medium-common"



export  const Auth = ({type}: {type: "signup" | "signin"}) => {
    const navigate = useNavigate()
    const [postInput,setPostInput] = useState<SignupInput>({
        email:"",
        name:"",
        password:""
    })

async function sendRequest() {
    try{
        const reponse = await axios.post(`${BACKEND_URL}/api/v1/user/${type == "signup" ? "signup" : "signin"}`,postInput)
        const jwt = reponse.data.jwt;
        localStorage.setItem("token",JSON.stringify(jwt));
        navigate("/blogs");
    }catch(e){
        alert("Error while sign in")
    }

    
}

    return <div className="h-screen flex flex-col justify-center ">
        <div className="flex justify-center">
            <div className="">
                <div className="px-10">
                    <div className="text-4xl font-bold">
                        Create an account
                    </div>
                    <div className="text-slate-500 ml-2 pl-2 text-xl mt-2">
                      {type =='signin' ?  "Don't have an account" : "Already have an account"}? 
                        <Link className="underline pl-0.5" to={type == "signin" ? "/signup" :"/signin"}>
                        {type == "signin" ? "Sign up" : "Sign in"}
                        </Link>
                    </div>
                </div>
               
                <div className="mt-3.5 ">
                    {type == "signin" ? null: 
                         <LabelledInputs label='Name' placeholder="Elsa" onChange={(e)=>{
                        setPostInput({
                        ...postInput,
                        name:e.target.value
                        })
                        }} />  
                    }
                   
                    <LabelledInputs label='Email' placeholder="elsa@gmail.com" onChange={(e)=>{
                        setPostInput({
                        ...postInput,
                        email:e.target.value
                        })
                        }} />
                    
                    <LabelledInputs label='Password' type={"password"} placeholder="Password" onChange={(e)=>{
                        setPostInput({
                        ...postInput,
                        password:e.target.value
                        })
                        }} />
                    <button onClick = {sendRequest} type="button" className="mt-5 w-full text-amber-50 text-unite bg-gray-400 hover:bg-gray-800 
                    focus:out line-none cursor-pointer focus:ring-gray-300 font-medium rounded-lg 
                    text-md px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark: 
                    dark:border-gray-700">{type == "signup" ? "Sign up" : "Sign in"}</button>
                </div>
            </div>

        </div>

    </div>


}

interface LabelledInputTypes{
    label:string,
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string

}
function LabelledInputs({label, placeholder, onChange, type}:LabelledInputTypes){
    return<div>
            <label className="block mb-2 text-md font-semibold text-black pt-2.5">{label}</label>
            <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border
             border-gray-300 text-gray-900 text-md rounded-lg
             focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
            " 
            placeholder={placeholder} required />
        </div>

}