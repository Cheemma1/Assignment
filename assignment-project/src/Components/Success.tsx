import { Link } from "react-router-dom";
import check from "../assets/Check.png";
import { KeyboardReturn as KeyboardReturn } from "@mui/icons-material";

const Success = () => {
  return (
    <div className="container m-auto h-screen  ">
      <h1 className="font-bold font-Rubik text-right p-3"> ASHEFAMU</h1>
      <div className=" mt-32  flex flex-col items-center justify-center">
        <img src={check} alt="check-png" />
        <h1 className="font-bold font-Rubik pt-3">
          Password Successfully Changed
        </h1>
        <Link
          to={"/sign"}
          className="rounded-md bg-green py-2 px-4 f mt-4 text-white lg:w-44  flex items-center gap-2"
        >
          <KeyboardReturn />
          Back to login
        </Link>
      </div>
    </div>
  );
};

export default Success;
