import img from "../assets/leftimage.png";
import email from "../assets/Email.png";
import { useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { EmailOutlined as EmailOutlinedIcon } from "@mui/icons-material";
import customAxios from "../utils/customAxios";

interface FormData {
  email: string;
}
const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required!"),
});
const ForgetPassword = () => {
  const navigate = useNavigate();

  const handleForgetPassword = async (values: FormData) => {
    try {
      const res = await customAxios.post("/forgot-password", values);
      navigate("/resetpassword");
      console.log("res", res.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className=" m-auto ">
      <div className="  flex  m-auto h-screen">
        <img
          src={img}
          alt="hospital-image"
          className=" w-3/4 h-sreen hidden md:block"
        />
        <div className=" w-full p-6">
          <p className="font-bold font-Inter text-right ">ASHEFAMU</p>

          <Formik
            initialValues={{
              email: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={handleForgetPassword}
          >
            {({ errors, touched }) => (
              <Form className="my-3 font-Inter flex flex-col gap-2 mt-10">
                <img src={email} alt="email-png" className="w-48" />
                <h1 className="font-Rubik font-bold">
                  Enter your email address
                </h1>
                <p className="font-inter font-thin text-sm w-64">
                  A password reset OTP code will be sent to your email to
                  continue the reset process
                </p>
                <div>
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
                <button
                  type="submit"
                  className="rounded-md bg-green py-2 px-4 mt-4 text-white lg:w-44 "
                >
                  Continue
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
