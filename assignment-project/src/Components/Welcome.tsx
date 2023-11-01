import check from "../assets/Check.png";

const Welcome = () => {
  return (
    <div className="container m-auto ">
      <div className="flex  flex-col items-center justify-center  h-screen">
        <img src={check} alt="check-png" />
        <h1 className="font-bold font-Rubik py-2">Welcome to ASHEFAMU</h1>
        <p className="font-inter  w-72 text-center ">
          Anambra State Health Facilities Accreditation and Monitoring Unit
        </p>
      </div>
    </div>
  );
};

export default Welcome;
