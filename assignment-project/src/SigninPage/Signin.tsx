import { useState } from "react";

import {
  EmailOutlined as EmailOutlinedIcon,
  LockOutlined as LockOutlinedIcon,
  VisibilityOffOutlined as VisibilityOffOutlinedIcon,
  VisibilityOutlined as VisibilityOutlinedIcon,
} from "@mui/icons-material";
import img from "../assets/leftimage.png";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import customAxios from "../utils/customAxios";

interface FormData {
  username: string;
  password: string;
}

const SignupSchema = Yup.object().shape({
  username: Yup.string().email("Invalid email").required("Email is required!"),
  password: Yup.string().required("Password is required!"),
});

const Signin = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values: FormData) => {
    try {
      const response = await customAxios.post("/auth/sign-in", values);
      navigate("/welcome");
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  //toggle show passoword
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword: boolean) => !prevShowPassword);
  };

  return (
    <div className=" m-auto ">
      <div className="  flex  m-auto h-screen">
        <img
          src={img}
          alt="hospital-image"
          className=" w-3/4 hidden md:block"
        />
        <div className=" w-full p-6">
          <p className="font-bold font-Inter text-right ">ASHEFAMU</p>
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form className="my-3 font-Inter flex flex-col gap-2 mt-36">
                <h1 className="font-bold font-Rubik  block ">Sign In</h1>

                <div>
                  <label htmlFor="email">Email</label>

                  <div
                    className={`flex items-center gap-1  px-1 py-1  xl:w-1/2 rounded-md border border-base100 ${
                      errors.username && touched.username
                        ? "border-red"
                        : "border-base100"
                    }`}
                  >
                    <EmailOutlinedIcon className="text-base300" />
                    <Field
                      type="email"
                      name="username"
                      className="border-0 outline-none"
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="password">Password</label>

                  <div
                    className={`flex items-center gap-1  px-1 py-1  xl:w-1/2 rounded-md  md:justify-between border ${
                      errors.password && touched.password
                        ? "border-red"
                        : "border-base100"
                    }`}
                  >
                    <LockOutlinedIcon className="text-base300" />
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="border-0 outline-none"
                    />
                    <div onClick={handleTogglePassword}>
                      {showPassword ? (
                        <VisibilityOutlinedIcon className="text-base300" />
                      ) : (
                        <VisibilityOffOutlinedIcon className="text-base300" />
                      )}
                    </div>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red text-sm"
                  />
                </div>
                <div></div>

                <button
                  type="submit"
                  className="rounded-md bg-green py-2 mt-2 text-white xl:w-1/2"
                >
                  Sign in
                </button>
              </Form>
            )}
          </Formik>
          <p className=" text-sm md:text-base flex  gap-2 font-Inter  my-5">
            Don't have an account?
            <Link to={"/"} className="text-green font-bold">
              Create one
            </Link>
          </p>
          <Link
            to={"/forgotpassword"}
            className="font-bold rounded-md bg-green py-2 px-3 mt-6 text-white w-full xl:w-1/2  "
          >
            Forget password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;
