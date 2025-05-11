import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const navigate = useNavigate();
  const { login, error, isLoading } = useLogin(); // Custom hook for login

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const { success } = await login(values.email, values.password);

        if(success){
          toast.success("Login successful!", {
            position: "top-right",
            autoClose: 5000,
          });
          
          //localStorage.setItem("token", response.data.token);
          navigate("/"); // Redirect to dashboard after login
        }
        
       
      } catch (error) {
        toast.error(error.response?.data?.error || "Login failed", {
          position: "top-right",
          autoClose: 5000,
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="login-container">
      <Navbar />
      <div className="container mx-auto px-4 py-40">
        <form
          className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
          onSubmit={formik.handleSubmit}
        >
          <div className="mb-6 bg-[#9B5D47] py-2 px-4 rounded-lg shadow-md">
            <h2 className="text-center text-2xl font-bold text-white">Welcome Back</h2>
            <p className="text-center text-sm text-white mb-4">Continue Planning Your Perfect Wedding</p>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#9B5D47] peer"
              placeholder=" "
              required
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 text-[#9B5D47]"
            >
              Email address
            </label>
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="password"
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#9B5D47] peer"
              placeholder=" "
              required
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 text-[#9B5D47]"
            >
              Password
            </label>
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
            )}
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 text-[#9B5D47] focus:ring-[#9B5D47] border-gray-300 rounded"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm text-[#9B5D47] hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-[#9B5D47] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#7E4835] transition duration-300"
            disabled={formik.isSubmitting || isLoading}
          >
            {formik.isSubmitting ? "Signing In..." : "Sign In"}
          </button>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <p className="text-center mt-4 text-gray-700">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#9B5D47] font-semibold hover:underline">
              Create one
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;