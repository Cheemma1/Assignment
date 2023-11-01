import { useEffect, useState } from "react";
import img from "../assets/leftimage.png";
import emailpng from "../assets/Email.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import customAxios from "../utils/customAxios";
import { useNavigate } from "react-router-dom";

interface FormData {
  mobileotp: string;
  emailotp: string;
}

const validationSchema = Yup.object().shape({
  mobileotp: Yup.string().required("Phone OTP is required"),
  emailotp: Yup.string().required("Email OTP is required"),
});

const Otppage = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState<any>("");
  const [userPhoneNumber, setUserPhoneNumber] = useState<any>("");
  const [resendTimeout, setResendTimeout] = useState(120);
  const [resendDisabled, setResendDisabled] = useState(false);
  const email = localStorage.getItem("email");
  const mobile = localStorage.getItem("mobile");

  const maskEmail = (email: string): string => {
    const atIndex = email.indexOf("@");
    const maskedEmail =
      email.slice(0, atIndex - 3) + "******" + email.slice(atIndex);
    return maskedEmail;
  };

  const maskPhoneNumber = (mobile: string): string => {
    if (mobile) {
      if (mobile.length >= 8) {
        const maskedNumber = mobile.slice(0, -5) + "******" + mobile.slice(-2);
        return maskedNumber;
      }
    }
    return "";
  };

  useEffect(() => {
    setUserEmail(email);
    setUserPhoneNumber(mobile);
  }, []);

  const maskedEmail = maskEmail(userEmail);
  const maskedPhoneNumber = maskPhoneNumber(userPhoneNumber);

  const handleSubmit = async (values: FormData, { resetForm }: any) => {
    const { emailotp, mobileotp } = values;

    const postRequests = [
      customAxios.post("/verify-mobile", { email, mobileotp }),
      customAxios.post("/verify-email", { email, emailotp }),
    ];
    try {
      const [response1, response2] = await Promise.all(postRequests);
      if (response1.status && response2.status === 200) {
        console.log("Response 1:", response1.data);
        console.log("Response 2:", response2.data);
        navigate("/welcome"); // Redirect to the Welcome page
      }
    } catch (error) {
      console.log(error);
    } finally {
      resetForm(); // Reset the form after successful submission
    }
  };

  useEffect(() => {
    if (resendTimeout > 0 && resendDisabled) {
      const timer = setTimeout(() => setResendTimeout(resendTimeout - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setResendDisabled(false);
    }
  }, [resendTimeout, resendDisabled]);

  const handleResend = () => {
    customAxios
      .post("/resend-verification-otp", email)
      .then(() => {
        console.log("Resending OTPs...");
        setResendDisabled(true);
        setResendTimeout(120); // Reset the timer to 120 seconds
      })
      .catch((error) => {
        throw new error();
      });
  };

  return (
    <div className="m-auto">
      <div className="flex m-auto h-screen">
        <img src={img} alt="hospital-image" className="w-3/4 hidden md:block" />
        <div className="w-full p-6">
          <p className="font-bold font-Inter text-right">ASHEFAMU</p>
          <Formik
            initialValues={{ mobileotp: "", emailotp: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="my-3 font-Inter flex flex-col gap-2 mt-36">
              <img src={emailpng} alt="email-png" className="w-32" />
              <h1 className="font-bold font-Rubik block">OTP sent to you</h1>
              <p>
                An OTP was sent to {maskedEmail} and {maskedPhoneNumber}. Enter
                the codes into the fields below
              </p>
              <div>
                <p>Phone OTP</p>
                <Field
                  type="text"
                  name="mobileotp"
                  className="bg-transparent outline-none border rounded-md"
                />
                <ErrorMessage
                  name="mobileotp"
                  component="div"
                  className="text-red"
                />
                <p>
                  {resendDisabled
                    ? `Resend code in ${resendTimeout} secs`
                    : "Resend code"}
                  <span onClick={handleResend} className="text-blue-500"></span>
                </p>
              </div>
              <div>
                <p>Email OTP</p>
                <Field
                  type="text"
                  name="emailotp"
                  className="bg-transparent outline-none border rounded-md"
                />
                <ErrorMessage
                  name="emailotp"
                  component="div"
                  className="text-red"
                />
                <p>
                  {resendDisabled
                    ? `Resend code in ${resendTimeout} secs`
                    : "Resend code"}
                </p>
              </div>
              <button
                type="submit"
                className="rounded-md bg-green py-2 mt-2 text-white lg:w-1/2"
              >
                Submit
              </button>
            </Form>
          </Formik>
          {/* <span onClick={handleResend}>Resend</span> */}
        </div>
      </div>
    </div>
  );
};

export default Otppage;
