import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { useMutation } from "react-query";
import { API, setAuthToken } from "../../../config/api";
import { UserContext } from "../../../context/userContext";
import Swal from "sweetalert2";

export default function SignIn() {
    let Navigate = useNavigate();
    const [, dispatch] = useContext(UserContext);

    const [formLogin, setFormLogin] = useState({
      email: "",
      password: "",
    });
  
    const ChangeLogin = (e) => {
      setFormLogin({
        ...formLogin,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleLoginMutation = useMutation(async () => {
      const response = await API.post("/login", formLogin);
      return response.data.data;
    }, {
      onSuccess: (data) => {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: data,
        });
  
        setAuthToken(data.token);
  
        // Status check
        if (data.is_admin === true) {
          Navigate("/tabletransaction");
        } else {
          Navigate("/");
        }
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login Success",
          showConfirmButton: false,
          timer: 1500,
        });
      },
      onError: () => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Login Failed",
          showConfirmButton: false,
          timer: 1500,
        });
      },
    });
  
    const handleLogin = (e) => {
      e.preventDefault();
      handleLoginMutation.mutate();
    };
  
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div
            className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
            aria-hidden="true"
        >
            <div
            className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
            style={{
                clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            />
        </div>
            <div className="mt-28 sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in to your account
                </h2>
            </div>
    
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="#" method="POST">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email address
                    </label>
                    <div className="mt-2">
                    <input
                        id="email"
                        name="email"
                        value={formLogin.email}
                        onChange={ChangeLogin}
                        type="email"
                        autoComplete="email"
                        required
                        className="block w-full rounded-md border-0 px-3.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    </div>
                </div>
    
                <div>
                    <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                        Password
                    </label>
                    <div className="text-sm">
                        <a href="/" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Forgot password?
                        </a>
                    </div>
                    </div>
                    <div className="mt-2">
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={formLogin.password}
                        onChange={ChangeLogin}
                        autoComplete="current-password"
                        required
                        className="block w-full rounded-md border-0 px-3.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    </div>
                </div>
    
                <div>
                    <button
                    type="submit"
                    onClick={handleLogin}
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                    Sign in
                    </button>
                </div>
                </form>
    
                <p className="mt-10 text-center text-sm text-gray-500">
                Haven't a account?{' '}
                <Link to="/create-account" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                    Click here
                </Link>
                </p>
            </div>
        </div>
    )
}
