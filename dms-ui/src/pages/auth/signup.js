import React from 'react';
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import API from '../../util/api';
const Signup = () => {
    
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    let navigate = useNavigate();

    const onSubmit = data => {
        API.post('/signup', data).then((res) => {
            localStorage.removeItem("token");
            navigate('/login')
        }).catch(err => { console.log(err) })
    }

    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-orange-100 w-80 text-left" >
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>

                    <input {...register("email", { required: true })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" placeholder="Email" />
                    {errors.email && <span className="text-red-600 text-sm">This field is required</span>}
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input {...register("password", { required: true })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" />
                    {errors.password && <span className="text-red-600 text-sm">This field is required</span>}
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Signup
                    </button>
                </div>
                <div className="flex justify-end ">
                    <Link to="/login" className="underline text-blue-700">Login</Link>
                </div>
            </form>
        </div>
    );
};

export default Signup;