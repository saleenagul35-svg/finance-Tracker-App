import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    let navigate = useNavigate();
    const home = (event) => {
        event.preventDefault();
        // if(handleForm.Email===userDetails.Email && handleForm.Password===userDetails.Password){
                 navigate("/dashboard")
        // }else{
            // alert("User Email or Password is wrong");
        // }
       
       

    }
  let  userDetails = {Email:"saleenagul35@gmail.com",Password:"Nurture@2.0"}
  localStorage.setItem("userDetails", JSON.stringify(userDetails))
    const [handleForm, setHandleForm] = useState({ Email: "", Password: "" })
    const FormData = (event) => {
        const { name, value } = event.target;
        setHandleForm(prev => ({
            ...prev,
            [name]: value
        }))

    }
    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-slate-900 to-slate-800">

                <div className="bg-white p-8 rounded-lg shadow-lg w-80">

                    <h2 className="text-2xl font-semibold text-center mb-6">
                        Login
                    </h2>

                    <form className="flex flex-col gap-4" onSubmit={home}>

                        {/* Email */}
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                required
                                name="Email"
                                value={handleForm.Email}
                                onChange={FormData}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                required
                                name="Password"
                                value={handleForm.Password}
                                onChange={FormData}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            className="bg-blue-600 text-white py-2 rounded mt-2"
                        >
                            Sign In
                        </button>

                    </form>

                </div>
            </div>
        </>
    );
};

export default Login;
