import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./SigninPage/Signin";
import Otppage from "./Otp/Otppage";
import Welcome from "./Components/Welcome";
import ForgetPassword from "./Reset/ForgetPassword";
import ResetPassword from "./Reset/ResetPassword";
import Success from "./Components/Success";
import Register from "./Registration/Register";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/sign" element={<Signin />} />
          <Route path="/success" element={<Success />} />
          <Route path="/otp" element={<Otppage />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/forgotpassword" element={<ForgetPassword />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
