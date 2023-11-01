import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import customAxios from "../utils/customAxios";
import {
  PersonOutlineOutlined as PersonOutlineOutlinedIcon,
  EmailOutlined as EmailOutlinedIcon,
  PhoneOutlined as PhoneOutlinedIcon,
  LockOutlined as LockOutlinedIcon,
  VisibilityOffOutlined as VisibilityOffOutlinedIcon,
  VisibilityOutlined as VisibilityOutlinedIcon,
} from "@mui/icons-material";
import img from "../assets/leftimage.png";
import { Link, useNavigate } from "react-router-dom";

interface FormData {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  mobile: string;
  password: string;
  confirmpassword: string;
}

const SignupSchema = Yup.object().shape({
  firstname: Yup.string().required("First Name is required!"),
  lastname: Yup.string().required("Last Name is required!"),
  username: Yup.string().required("User Name is required!"),
  email: Yup.string().email("Invalid email").required("Email is required!"),
  mobile: Yup.string().required("Phone number is required!"),
  password: Yup.string()
    .required("Password is required!")
    .min(8, "Password must be at least 8 characters"),
  confirmpassword: Yup.string()
    .test("passwords-match", "Passwords must match!", function (value) {
      return value === this.parent.password || value === null;
    })
    .required("Please confirm your password"),
});

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (values: FormData, { resetForm }: any) => {
    try {
      const { confirmpassword, ...formDataToSend } = values;
      const { email, mobile } = values;
      const response = await customAxios.post("/auth/sign-up", formDataToSend);
      if (response.status == 200) {
        localStorage.setItem("email", email);
        localStorage.setItem("mobile", mobile);
        navigate("/otp"); // Redirect to the OTP page
        resetForm(); // Reset the form after successful submission
      }
    } catch (error) {
      setError("An error occurred while processing your request");
      console.log(error);
    }
  };

  //toggle show passoword
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword: boolean) => !prevShowPassword);
  };

  return (
    <div className=" m-auto">
      <div className="  flex  h-screen m-auto">
        <img
          src={img}
          alt="hospital-image"
          className=" w-3/4 hidden md:block"
        />
        <div className=" w-full p-6">
          <div className=" flex justify-end md:justify-between  ">
            <p className="font-bold font-Rubik hidden md:block">
              Create an account
            </p>
            <p className="font-bold font-Inter ">ASHEFAMU</p>
          </div>
          <Formik
            initialValues={{
              firstname: "",
              lastname: "",
              username: "",
              email: "",
              mobile: "",
              password: "",
              confirmpassword: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form className="my-3 font-Inter flex flex-col gap-2">
                <h1 className="font-bold font-Rubik  block md:hidden">
                  Create an account
                </h1>
                <p>{error}</p>
                <div>
                  <label htmlFor="firstname">First Name</label>

                  <div
                    className={`flex items-center gap-1  px-1 py-1  xl:w-1/2 rounded-md border ${
                      errors.firstname && touched.firstname
                        ? "border-red"
                        : "border-base100"
                    }`}
                  >
                    <PersonOutlineOutlinedIcon className="text-base300" />
                    <Field
                      type="text"
                      name="firstname"
                      className="border-0 outline-none"
                    />
                  </div>
                  <ErrorMessage
                    name="firstname"
                    component="div"
                    className="text-red text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="lastname">last Name</label>

                  <div
                    className={`flex items-center gap-1  px-1 py-1  xl:w-1/2 rounded-md border ${
                      errors.lastname && touched.lastname
                        ? "border-red"
                        : "border-base100"
                    }`}
                  >
                    <PersonOutlineOutlinedIcon className="text-base300" />
                    <Field
                      type="text"
                      name="lastname"
                      className="border-0 outline-none"
                    />
                  </div>
                  <ErrorMessage
                    name="lastname"
                    component="div"
                    className="text-red text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="username">User Name</label>

                  <div
                    className={`flex items-center gap-1  px-1 py-1  xl:w-1/2 rounded-md border ${
                      errors.username && touched.username
                        ? "border-red"
                        : "border-base100"
                    }`}
                  >
                    <PersonOutlineOutlinedIcon className="text-base300" />
                    <Field
                      type="text"
                      name="username"
                      className="border-0 outline-none"
                    />
                  </div>
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="email">Email</label>

                  <div
                    className={`flex items-center gap-1  px-1 py-1  xl:w-1/2 rounded-md border border-base100 ${
                      errors.email && touched.email
                        ? "border-red"
                        : "border-base100"
                    }`}
                  >
                    <EmailOutlinedIcon className="text-base300" />
                    <Field
                      type="email"
                      name="email"
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
                  <label htmlFor="mobile">Phone</label>

                  <div
                    className={`flex items-center gap-1  px-1 py-1  xl:w-1/2 rounded-md border ${
                      errors.mobile && touched.mobile
                        ? "border-red"
                        : "border-base100"
                    }`}
                  >
                    <PhoneOutlinedIcon className="text-base300" />
                    <Field
                      type="text"
                      name="mobile"
                      className="border-0 outline-none"
                    />
                  </div>
                  <ErrorMessage
                    name="mobile"
                    component="div"
                    className="text-red text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="password">Password</label>

                  <div
                    className={`flex items-center  gap-1  px-1 py-1  xl:w-1/2 rounded-md  md:justify-between border ${
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

                    <div onClick={handleTogglePassword} className="text-right">
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
                <div>
                  <label htmlFor="name">Confirm Password</label>

                  <div
                    className={`flex items-center   gap-1  px-1 py-1  xl:w-1/2 rounded-md md:justify-between border ${
                      errors.confirmpassword && touched.confirmpassword
                        ? "border-red"
                        : "border-base100"
                    }`}
                  >
                    <LockOutlinedIcon className="text-base300" />
                    <Field
                      type={showPassword ? "text" : "confirmpassword"}
                      name="confirmpassword"
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
                    name="confirmpassword"
                    component="div"
                    className="text-red text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="rounded-md bg-green py-2 mt-2 text-white lg:w-1/2"
                >
                  Create account
                </button>
              </Form>
            )}
          </Formik>

          <p className="flex items-center gap-2 font-Inter">
            Already have an account
            <Link to={"/sign"} className="text-green font-bold">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
