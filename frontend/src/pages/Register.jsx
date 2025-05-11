import { useFormik } from "formik";
import * as Yup from "yup";
import { Link , useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import { useSignup } from "../hooks/useSignup";

const Register = () => {
    const navigate = useNavigate();

    const { signup, error, isLoading } = useSignup();


    const validationSchema = Yup.object().shape({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string().matches(/^[0-9]{10}$/, "Invalid phone number"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
      role: Yup.string()
        .oneOf(["couple", "vendor"])
        .required("Role is required"),
    });
  
    const formik = useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        role: "couple",
      },
      validationSchema,
      onSubmit: async (values, { setSubmitting }) => {
        
          const { confirmPassword, ...submitData } = {
            ...values,
            phone: values.phone || "", 
          }

          console.log("Submitting data:", submitData); // Log the data being submitted
          
          const { success, error } = await signup(submitData);
         
        if(success){
            toast.success("Registration successful! Redirecting...", {
                position: "top-right",
                autoClose: 5000,
              });
              setTimeout(() => navigate("/"), 2000); // Redirect after 2 seconds
        }else{
            toast.error(error, {
                position: "top-right",
                autoClose: 5000,
              });
                console.error("Registration error:", error.response?.data);
        }
         setSubmitting(false);
          
        },
    });
  

  return (
    <div className="register-container">
      <Navbar />
      <div className="container mx-auto px-4 py-50">
        <form
          className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
          onSubmit={formik.handleSubmit}
        >
          <div className="mb-6 bg-[#9B5D47] py-2 px-4 rounded-lg shadow-md">
            <h2 className="text-center text-2xl font-bold text-white">
              Create Your Account
            </h2>
            <p className="text-center text-sm text-white mb-4">
              Start Planning Your Perfect Wedding Day
            </p>
          </div>

          {/* First Name */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="firstName"
              id="firstName"
              className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
                formik.errors.firstName && formik.touched.firstName ? 'border-red-500' : 'border-gray-300'
              } appearance-none focus:outline-none focus:ring-0 focus:border-[#9B5D47] peer`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
              placeholder=" "
            />
            <label
              htmlFor="firstName"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 text-[#9B5D47]"
            >
              First Name
            </label>
            {formik.errors.firstName && formik.touched.firstName && (
              <p className="mt-1 text-xs text-red-500">{formik.errors.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="lastName"
              id="lastName"
              className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
                formik.errors.lastName && formik.touched.lastName ? 'border-red-500' : 'border-gray-300'
              } appearance-none focus:outline-none focus:ring-0 focus:border-[#9B5D47] peer`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
              placeholder=" "
            />
            <label
              htmlFor="lastName"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 text-[#9B5D47]"
            >
              Last Name
            </label>
            {formik.errors.lastName && formik.touched.lastName && (
              <p className="mt-1 text-xs text-red-500">{formik.errors.lastName}</p>
            )}
          </div>

          {/* Email */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="email"
              id="email"
              className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
                formik.errors.email && formik.touched.email ? 'border-red-500' : 'border-gray-300'
              } appearance-none focus:outline-none focus:ring-0 focus:border-[#9B5D47] peer`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 text-[#9B5D47]"
            >
              Email address
            </label>
            {formik.errors.email && formik.touched.email && (
              <p className="mt-1 text-xs text-red-500">{formik.errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="tel"
              name="phone"
              id="phone"
              className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
                formik.errors.phone && formik.touched.phone ? 'border-red-500' : 'border-gray-300'
              } appearance-none focus:outline-none focus:ring-0 focus:border-[#9B5D47] peer`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              placeholder=" "
            />
            <label
              htmlFor="phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 text-[#9B5D47]"
            >
              Phone Number (optional)
            </label>
            {formik.errors.phone && formik.touched.phone && (
              <p className="mt-1 text-xs text-red-500">{formik.errors.phone}</p>
            )}
          </div>

          {/* Role */}
          <div className="relative z-0 w-full mb-5 group">
            <select
              name="role"
              id="role"
              className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
                formik.errors.role && formik.touched.role ? 'border-red-500' : 'border-gray-300'
              } appearance-none focus:outline-none focus:ring-0 focus:border-[#9B5D47] peer`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.role}
            >
              <option value="couple" className="">Couple</option>
              <option value="vendor" className="">Vendor</option>
              
            </select>
            <label
              htmlFor="role"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 text-[#9B5D47]"
            >
              Role
            </label>
            {formik.errors.role && formik.touched.role && (
              <p className="mt-1 text-xs text-red-500">{formik.errors.role}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="password"
              id="password"
              className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
                formik.errors.password && formik.touched.password ? 'border-red-500' : 'border-gray-300'
              } appearance-none focus:outline-none focus:ring-0 focus:border-[#9B5D47] peer`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              placeholder=" "
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 text-[#9B5D47]"
            >
              Password
            </label>
            {formik.errors.password && formik.touched.password && (
              <p className="mt-1 text-xs text-red-500">{formik.errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
                formik.errors.confirmPassword && formik.touched.confirmPassword ? 'border-red-500' : 'border-gray-300'
              } appearance-none focus:outline-none focus:ring-0 focus:border-[#9B5D47] peer`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              placeholder=" "
            />
            <label
              htmlFor="confirmPassword"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 text-[#9B5D47]"
            >
              Confirm Password
            </label>
            {formik.errors.confirmPassword && formik.touched.confirmPassword && (
              <p className="mt-1 text-xs text-red-500">{formik.errors.confirmPassword}</p>
            )}
          </div>

          <div className="flex items-center space-x-2 mb-4">
            <input
              type="checkbox"
              id="terms"
              className="w-4 h-4 text-[#9B5D47] focus:ring-[#9B5D47] border-gray-300 rounded"
              required
            />
            <label htmlFor="terms" className="text-sm text-gray-700">
              I agree to the{" "}
              <a href="#" className="text-[#9B5D47] underline">
                Terms and Conditions
              </a>
            </label>
          </div>

          <button
            type="submit"
            disabled={formik.isSubmitting || isLoading}
            className="w-full bg-[#9B5D47] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#7E4835] transition duration-300"
          >
            {formik.isSubmitting ? "Creating Account..." : "Create Account"}
          </button>
            {error && (
                <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
            )}
          <p className="text-center mt-4 text-gray-700">
            Already have an account?{" "}
            <Link to="/login" className="text-[#9B5D47] font-semibold hover:underline">
              Log in here
            </Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;