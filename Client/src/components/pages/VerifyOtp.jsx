import { useEffect, useRef, useState } from "react";
import { verifyOTP } from "../../Api/Query/userQuery";
import { Link, useLocation, useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const inputRef = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state);

  const [otp, setOtp] = useState(new Array(6).fill("")); // OTP state as an array
  const [timer, setTimer] = useState(60);
  const [otpSent, setOtpSent] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(true);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let countDown;
    if (otpSent && timer > 0) {
      countDown = setInterval(() => {
        setTimer((prev) => prev + 1);
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

  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage]);

  
  //   handle Onchange
  const handleOnChange = (e, index) => {
    const value = e.target.value;
    console.log(e.keydown);
    

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
    try {
      const response = await verifyOTP({
        opt: otp.join(""),
        email: location.state,
      });

      console.log(otp);

      if (response.data.error) {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setErrorMessage("An error occurred while Register. Please try again.");
    }
  };

  return (
    <section className="container w-full mx-auto px-2">
      <div className="bg-white my-2 w-full max-w-md mx-auto rounded py-2 px-6">
        <h2 className="text-[1.3rem]">Please Enter a 6-digits code</h2>
        <p className="text-gray-500">
          We sent you 6-digit code to you at{" "}
          <span className="font-bold">{location.state}</span>
        </p>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {successMessage && <p className="text-green-600">{successMessage}</p>}

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
              Verify OTP
            </button>
          </form>
        </div>
        <Link to={"/forgot-password"}>
          <button className="p-2 rounded bg-green-800 text-white border-none">
            Resend OTP
          </button>
        </Link>
      </div>
    </section>
  );
};

export default VerifyOtp;
