import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useUserContext } from "../context/userContext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [userCookies, setUserCookies] = useCookies(["user_token"]);
  const [userId, setUserId] = useCookies(["user_Id"]);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const { setUserID } = useUserContext();

  useEffect(() => {
    // Check if the user is logged in
    if (userCookies.user_token) {
      // If the user is logged in, redirect to the appropriate page
      navigate("/msg");
    }
  }, [userCookies.user_token, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setErrors({ ...errors, message: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/user/login",
        formData
      );
      alert("User LoggedIn successfully!");
      console.log("response:", response.data);
      console.log("userId:", response.data.userId);
      const userId = response.data.userId;

      setUserID(userId);
      setUserId("user_Id", userId);
      setUserCookies("user_token", response.data.token);
      navigate("/msg");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form. Please try again.");
      if (error.response && error.response.status === 400) {
        const { data } = error.response;
        if (data.errors) {
          // Handle errors here
          console.log("Validation errors:", data.errors);
          setErrors(data.errors);
        }
      }
    }
  };

  return (
    <div
      className={
        "flex flex-col sm:flex-row gap-2 min-h-screen items-center justify-center bg-[#CDFCF9] px-4 font-Roboto"
      }
    >
      <div className={"max-w-md pr-[1.5rem] py-2"}>
        <h1 className={"text-[2rem] font-bold text-[#208FF5]"}>BabiSocial</h1>
        <p className={"text-gray-700"}>
          Connect with friends and the world <br /> around you using babisocial.
        </p>
      </div>
      <div className="max-w-lg">
        <h1 className="text-[2.5rem] font-bold text-blue-500 font-Roboto text-center py-2">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-md">
          <input
            name="email"
            type="text"
            className={
              "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 my-3"
            }
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <div className="my-2">
            <input
              name="password"
              type="password"
              className={
                "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              }
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.message && (
              <div className="text-red-500">{errors.message}</div>
            )}
          </div>
          {/* <input
            type="password"
            className={
              "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 my-3"
            }
            placeholder="Password Again"
          /> */}
          <div className={"flex flex-col items-center"}>
            <button
              className={
                "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full my-2 text-lg"
              }
            >
              Login
            </button>
            <Link
              to={`/`}
              className={
                " bg-blue-500 w-3/5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
              }
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
