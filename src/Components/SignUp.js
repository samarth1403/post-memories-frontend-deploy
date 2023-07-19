import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Input from './ReusableComponents/Input';
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { registerUser } from '../features/user/userSlice';
import Spinner from './ReusableComponents/Spinner';

const SignUp = () => {

     const {registeredUser , res , isLoading} = useSelector((state)=>state.user);
     const navigate = useNavigate();

     useEffect(() => {
       if (res?.success && registeredUser) {
         navigate("/sign-in-page");
       }
     }, [registeredUser]);

    const dispatch = useDispatch();

     let schema = Yup.object().shape({
       name: Yup.string().required("Name is Required"),
       email: Yup.string()
         .email("Email Should be Valid")
         .required("Email is Required"),
       mobile: Yup.number().required("Mobile Number is Required"),
       password: Yup.string().required("Password is Required"),
     });

     const formik = useFormik({
       enableReinitialize: true,
       initialValues: {
         name: "",
         email: "",
         mobile: "",
         password: "",
       },
       validationSchema: schema,
       onSubmit: (values) => {
          dispatch(registerUser(values))
         formik.resetForm();
       },
     });
  return (
    <div className="flex flex-col flex-wrap justify-center items-center">
      <p className="font-roboto font-bold text-[#fff] text-4xl m-6">
        Create Account
      </p>

      <form
        onSubmit={formik.handleSubmit}
        style={{
          background: "linear-gradient(180deg, #ACE7FF 0%, #53FFB8 100%)",
        }}
        className="flex flex-col flex-no-wrap justify-center items-center min-[320px]:w-[280px] sm:w-[360px] lg:w-[500px] rounded-[25px] pt-6 "
      >
        <Input
          className="bg-[#0D103C] min-[320px]:w-[250px] sm:w-[300px] lg:w-[400px] h-[75px] text-[#fff] px-4 m-4"
          id="name"
          type="text"
          placeholder="Name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange("name")}
          onBlur={formik.handleBlur("name")}
        />
        <div className="text-black font-bold text-lg">
          {formik.touched.name && formik.errors.name ? (
            <div>{formik.errors.name}</div>
          ) : null}
        </div>

        <Input
          className="bg-[#0D103C] min-[320px]:w-[250px] sm:w-[300px] lg:w-[400px] h-[75px] text-[#fff] px-4  m-4"
          id="email"
          type="text"
          placeholder="Email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange("email")}
          onBlur={formik.handleBlur("email")}
        />
        <div className="text-black font-bold text-lg">
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null}
        </div>
        <Input
          className="bg-[#0D103C] min-[320px]:w-[250px] sm:w-[300px] lg:w-[400px] h-[75px] text-[#fff] px-4  m-4"
          id="mobile"
          type="number"
          placeholder="Phone Number"
          name="mobile"
          value={formik.values.mobile}
          onChange={formik.handleChange("mobile")}
          onBlur={formik.handleBlur("mobile")}
        />
        <div className="text-black font-bold text-lg">
          {formik.touched.mobile && formik.errors.mobile ? (
            <div>{formik.errors.mobile}</div>
          ) : null}
        </div>
        <Input
          className="bg-[#0D103C] min-[320px]:w-[250px] sm:w-[300px] lg:w-[400px] h-[75px] text-[#fff] px-4  m-4"
          id="password"
          type="password"
          placeholder="Password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange("password")}
          onBlur={formik.handleBlur("password")}
        />
        <div className="text-black font-bold text-lg">
          {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.password}</div>
          ) : null}
        </div>
        <div className="flex flex-row flex-no-wrap justify-between items-center">
          <button
            onClick={() => formik.resetForm()}
            style={{ boxShadow: "8px 8px 4px #0D103C" }}
            className="bg-[#fff] w-[100px] h-[75px] font-roboto font-bold  text-[#0D103C] text-2xl rounded-[20px] px-4 mx-4 mt-4 mb-8"
          >
            Reset
          </button>
          <button
            type="submit"
            style={{ boxShadow: "8px 8px 4px #0D103C" }}
            className="bg-[#fff] w-[100px] h-[75px] font-roboto font-bold  text-[#0D103C] text-2xl rounded-[20px] px-4 mx-4 mt-4 mb-8"
          >
            {isLoading === true ? <Spinner /> : "Sign Up"}
          </button>
        </div>
        {/* <button
          style={{ boxShadow: "8px 8px 4px #0D103C" }}
          className="bg-[#fff] w-[305px] h-[75px] text-[#0D103C] rounded-[20px] font-roboto font-bold text-2xl px-4 mx-4 mb-8"
        >
          Sign Up With Google
        </button> */}
      </form>
    </div>
  );
}

export default SignUp