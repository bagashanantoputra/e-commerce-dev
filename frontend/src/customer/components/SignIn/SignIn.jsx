import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { useMutation } from "react-query";
import { API, setAuthToken } from "../../../config/api";
import { UserContext } from "../../../context/userContext";
import { FaArrowLeft } from 'react-icons/fa';

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
          Navigate("/dashboard");
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
  
    const handleForgotPassword = () => {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Can't Access",
        text: "The forgot password feature is currently unavailable. Please try again later.",
        showConfirmButton: true,
        confirmButtonText: "OK",
        timer: 3000,
      });
    };

    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
        <Link to="/" className="absolute top-4 left-4 text-gray-600 hover:text-gray-800">
          <FaArrowLeft className="h-6 w-6" />
        </Link>
        <div className="relative bg-white shadow-xl rounded-lg w-full max-w-md px-8 py-10">
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
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Sign in to your account</h2>
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                value={formLogin.email}
                onChange={ChangeLogin}
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-gray-300 px-4 py-2 mt-1 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="text-sm">
                  <a 
                    href="/" 
                    className="font-semibold text-indigo-600 hover:text-indigo-500"                   
                    onClick={(e) => {
                      e.preventDefault(); // Prevents the default action of the anchor link
                      handleForgotPassword();
                    }}
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                value={formLogin.password}
                onChange={ChangeLogin}
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-gray-300 px-4 py-2 mt-1 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-500">
            Haven't an account?{' '}
            <Link to="/create-account" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Click here
            </Link>
          </p>
        </div>
      </div>
    )
}
