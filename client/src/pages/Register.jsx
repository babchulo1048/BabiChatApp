import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Joi from "joi";

const registerSchema = Joi.object({
  userName: Joi.string()
    .regex(/^[a-zA-Z]+$/)
    .required()
    .messages({
      "string.base": "Username must be a string",
      "string.pattern.base": "Username must contain only text",
      "any.required": "Username is required",
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  country: Joi.string()
    .regex(/^[a-zA-Z]+$/)
    .required()
    .messages({
      "string.base": "Country must be a string",
      "string.pattern.base": "Country must contain only text",
      "any.required": "Country is required",
    }),
  password: Joi.string()
    .min(6)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/)
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters long",
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, and one digit",
      "any.required": "Password is required",
    }),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .label("Confirm password")
    .messages({
      "any.only": "Confirm password must match the password",
      "any.required": "Confirm password is required",
    }),
});

const Register = () => {
  const [formData, setFormData] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchForm = async () => {
      const response = await axios.get("http://localhost:3001/userForm/detail");
      console.log("response:", response.data[0]);

      setFormData(response.data[0]);
    };
    fetchForm();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  // console.log("formData:", formData);
  if (formData) {
    // console.log("formData.fields:", formData.fields);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formValues) {
      console.error("Form data not available. Please try again.");
      return;
    }

    console.log("formValues:", formValues);

    try {
      await registerSchema.validateAsync(formValues, { abortEarly: false });

      await axios.post("http://localhost:3001/user/register", {
        formData: formValues,
      });
      alert("Form submitted successfully!");
      navigate("/login");
      // Optionally, you can redirect or perform any other action after successful form submission
    } catch (ex) {
      console.error("Error submitting form:", ex.message);
      alert("Failed to submit form. Please try again.");
      if (ex.response && ex.response.status === 400) {
        const { data } = ex.response;
        if (data.errors) {
          // Handle errors here
          console.log("Validation errors:", data.errors);
          setErrors(data.errors);
        }
      }
      if (ex?.details) {
        // Extract the validation errors from the Joi validation error
        const validationErrors = {};
        ex.details.forEach((error) => {
          validationErrors[error.context.key] = error.message;
        });
        console.log("validationErrors", validationErrors);
        setErrors(validationErrors);
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
      <div className={"max-w-lg"}>
        <h1 className="text-[2.5rem] font-bold text-blue-500 font-Roboto text-center py-2">
          Register
        </h1>
        {formData ? (
          <form className={"bg-white p-4 rounded-md"} onSubmit={handleSubmit}>
            {formData.fields.map((field, index) => (
              <div key={index}>
                {field.type === "textarea" ? (
                  <div>
                    <textarea
                      name={field.name}
                      value={formValues[field.name] || ""}
                      onChange={handleChange}
                      className={
                        "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      }
                    />
                    {errors[field.name] && (
                      <div className="text-red-500">{errors[field.name]}</div>
                    )}
                  </div>
                ) : field.type === "text" || field.type === "password" ? (
                  <div>
                    <input
                      type={field.type}
                      name={field.name}
                      value={formValues[field.name] || ""}
                      onChange={handleChange}
                      className={
                        "w-full px-3 py-2 my-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      }
                      placeholder={field.label}
                    />
                    {errors[field.name] && (
                      <div className="text-red-500">{errors[field.name]}</div>
                    )}
                  </div>
                ) : field.type === "select" ? (
                  <select
                    name={field.name}
                    value={formValues[field.name] || ""}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    {field.options.map((option) => (
                      <option key={option._id} value={option.name}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                ) : null}
              </div>
            ))}
            <div className={"flex flex-col items-center"}>
              <button
                className={
                  "w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                }
              >
                Register
              </button>
              <Link
                to={`/login`}
                // onClick={() => navigate(`/login`)}
                className={
                  "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-3/5 my-2 text-center"
                }
              >
                Login
              </Link>
            </div>
          </form>
        ) : (
          <p>Loading form...</p>
        )}
      </div>
    </div>
  );
};

export default Register;

// <input
//   type="text"
//   className={
//     "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//   }
//   placeholder="Username"
// />
// <input
//   type="text"
//   className={
//     "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 my-3"
//   }
//   placeholder="Email"
// />
// <input
//   type="text"
//   className={
//     "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//   }
//   placeholder="Password"
// />
// <input
//   type="text"
//   className={
//     "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 my-3"
//   }
//   placeholder="Password Again"
// />
