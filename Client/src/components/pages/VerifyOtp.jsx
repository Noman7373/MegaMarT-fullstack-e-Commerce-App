import { useEffect, useRef, useState } from "react";
import { verifyOTP } from "../../Api/Query/userQuery";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FETCH_STATUS } from "../status/fetchStatus";
import Loader from "../status/Loader";

const VerifyOtp = () => {
  const inputRef = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  const [status, setStatus] = useState("");

  const [otp, setOtp] = useState(new Array(6).fill("")); // OTP state as an array
  const [timer, setTimer] = useState(60);
  const [otpSent, setOtpSent] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(true);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // handle otp expire timer
  useEffect(() => {
    let countDown;
    if (otpSent && timer > 0) {
      countDown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer == 0) {
      setResendDisabled(false);
      clearInterval(countDown);
    }

    return () => clearInterval(countDown);
  }, [otpSent, timer]);

  useEffect(() => {
    if (!location?.state) {
      navigate("/forgot-password");
    }
  }, []);

  // handle show error or success messages
  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage]);

  //
  // handle onChange form Input
  const handleOnChange = (e, index) => {
    const value = e.target.value;
    setOtp((prev) => {
      const updatedOtp = [...prev];
      updatedOtp[index] = value;
      return updatedOtp;
    });
    // Move to the next input
    if (value && index < 5) {
      inputRef.current[index + 1].focus();
    }
  };

  // handle Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(FETCH_STATUS.LOADING);
    try {
      const response = await verifyOTP({
        otp: otp.join(""),
        email: location.state,
      });

      if (response.data.success) {
        navigate(`/reset-password/${response?.data?.id}`); // Navigate to reset password page
        setOtp(new Array(6).fill(""));
      }

      if (response.data.error) {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setErrorMessage("An error occurred while Register. Please try again.");
    }
  };

  const isLoading = status === FETCH_STATUS.LOADING;

  return (
    <section className="container w-full mx-auto px-2">
      <div className="bg-white my-2 w-full max-w-md mx-auto rounded py-2 px-6">
        <h2 className="text-[1.3rem]">Please Enter a 6-digits code</h2>
        <p className="text-gray-500">
          A verification code has been sent to{" "}
          <span className="font-bold">{location.state}</span> Enter the code to
          continue and be redirected.
        </p>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {successMessage && <p className="text-green-600">{successMessage}</p>}
        <p>{timer}</p>
        <div>
          <form
            className="flex gap-3 flex-col mt-4 py-2"
            onSubmit={handleSubmit}
          >
            <label htmlFor="otp">Enter Your OTP-Code *</label>

            <div className="flex gap-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOnChange(e, index)}
                  ref={(el) => (inputRef.current[index] = el)} // Save input reference
                  className="bg-blue-50 border font-semibold rounded px-2 w-full py-1 outline-none text-center focus:border-yellow-300"
                />
              ))}
            </div>

            <button
              type="submit"
              className="mt-4 border py-2 rounded bg-green-600 text-white font-bold"
            >
              {isLoading ? <Loader /> : " Verify OTP"}
            </button>
          </form>
        </div>
        {/* <Link to={"/forgot-password"}>
          <button className="p-2 rounded bg-green-800 text-white border-none">
            Resend OTP
          </button>
        </Link> */}
      </div>
    </section>
  );
};

export default VerifyOtp;
