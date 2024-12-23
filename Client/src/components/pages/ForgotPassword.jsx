import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userForgotPassword } from "../../Api/Query/userQuery";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validFormValues = validateEmail(email);

  useEffect(() => {
    if (errorMessage || successMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
        setSuccessMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage, successMessage]);

  const handleOnChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await userForgotPassword({ email });

      if (response.data.error) {
        setErrorMessage(response.data.message);
      }

      if (response.data.success) {
        setSuccessMessage(`Verifying link sent to your email: ${email}`);
        navigate("/verify-opt", {
          state: email,
          id: response.data,
        });
        setEmail("");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <section className="container w-full mx-auto px-2">
      <div className="bg-white my-2 w-full max-w-sm mx-auto rounded py-2 px-4">
        <p className="text-xl font-semibold">Verify Email</p>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {successMessage && <p className="text-green-600">{successMessage}</p>}
        {/* <p className="mt-4">Enter Your Email</p> */}
        <div>
          <form
            className="flex gap-3 flex-col mt-4 py-2"
            onSubmit={handleSubmit}
          >
            <label htmlFor="email">Email *</label>
            <input
              className="bg-blue-50 border rounded px-2 py-1 outline-none focus:border-yellow-300"
              type="email"
              name="email"
              id="email"
              required
              autoFocus
              autoComplete="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={handleOnChange}
            />

            <p className="flex items-end justify-end font-semibold hover:text-green-600">
              <Link to={"/login"}>Log In?</Link>
            </p>
            <button
              disabled={!validFormValues}
              type="submit"
              className={`${
                validFormValues
                  ? "bg-orange-600 text-center"
                  : "bg-orange-400  text-center cursor-not-allowed"
              } "mt-4 border py-2 bg-orange-800 text-center"  ${
                validFormValues ? " hover:bg-orange-700  text-center" : ""
              } rounded text-white font-bold  text-center"`}
            >
              Verify Email
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
