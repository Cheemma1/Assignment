import { ErrorMessage, Field, Form, Formik } from "formik";
import passkey from "../assets/Password.png";
import * as Yup from "yup";
import { VisibilityOffOutlined as VisibilityOffOutlinedIcon } from "@mui/icons-material";
import customAxios from "../utils/customAxios";
import { useNavigate } from "react-router-dom";

interface FormData {
  email: string;
  token: string;
  password: string;
}
const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required!"),
  token: Yup.string().required("token is required!"),
  password: Yup.string().required("password is required!"),
});

const ResetPassword = () => {
  const navigate = useNavigate();
  const OnReset = async (values: FormData) => {
    try {
      const res = await customAxios.post("/reset-password", values);
      navigate("/success");
      console.log("res", res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1 className="font-bold font-Rubik text-right p-2"> ASHEFAMU</h1>

      <div className="flex flex-col items-center mt-32">
        <img src={passkey} alt="padlock-png" />
        <h1 className="font-bold py-3">Generate new password</h1>
        <p className="font-inter w-64 text-center">
          Get the OTP sent to your email and enter your new password details
        </p>
        <Formik
          initialValues={{
            email: "",
            token: "",
            password: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={OnReset}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="mb-2">
                <div
                  className={`flex items-center gap-4  px-1 py-1  mt-3 rounded-md border border-base100 ${
                    errors.email && touched.email
                      ? "border-red"
                      : "border-base100"
                  }`}
                >
                  <Field
                    type="email"
                    name="email"
                    placeholder="New password"
                    className="border-0 outline-none"
                  />
                  <VisibilityOffOutlinedIcon className="text-base300" />
                </div>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red text-sm"
                />
              </div>
              <div>
                <div
                  className={`flex items-center  justify-between gap-1  px-1 py-1   mt-3 rounded-md border border-base100 ${
                    errors.password && touched.password
                      ? "border-red"
                      : "border-base100"
                  }`}
                >
                  <Field
                    type="password"
                    name="password"
                    placeholder="confirm password"
                    className="border-0 outline-none w-full"
                  />
                  <VisibilityOffOutlinedIcon className="text-base300" />
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red text-sm"
                />
              </div>
              <div>
                <div
                  className={`flex items-center gap-1  px-1 py-1 mt-3  rounded-md border border-base100 ${
                    errors.token && touched.token
                      ? "border-red"
                      : "border-base100"
                  }`}
                >
                  <Field
                    type="token"
                    name="token"
                    placeholder="Email Otp"
                    className="border-0 outline-none"
                  />
                  <VisibilityOffOutlinedIcon className="text-base300" />
                </div>
                <ErrorMessage
                  name="token"
                  component="div"
                  className="text-red text-sm"
                />
              </div>
              <button
                type="submit"
                className="rounded-md bg-green py-2 px-4 mt-4 text-white lg:w-44 grid m-auto"
              >
                Reset Password
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ResetPassword;
