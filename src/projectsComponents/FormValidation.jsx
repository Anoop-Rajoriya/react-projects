import React, { useId, useState } from "react";
import Heading from "../components/Heading";
import Input from "../components/Input";

const FormValidationProject = () => {
  const id = useId();
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  //  form submission validator
  // const validate = () => {
  //   const newErrors = {};
  //   if (isSignup && !formData.name) newErrors.name = "Name is required";
  //   if (!formData.email) newErrors.email = "Email is required";
  //   if (!formData.password) newErrors.password = "Password is required";
  //   if (isSignup && formData.password !== formData.confirmPassword) {
  //     newErrors.confirmPassword = "Passwords do not match";
  //   }
  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/; // Allows 3-16 chars, letters, numbers, underscores

    if (isSignup && !formData.name) {
      newErrors.name = "Name is required";
    } else if (isSignup && !usernameRegex.test(formData.name)) {
      newErrors.name =
        "Username must be 3-16 characters long and contain only letters, numbers, or underscores";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (isSignup && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //   handle user input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //   handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert(`${isSignup ? "Signup" : "Login"} successful!`);
      handleReset();
    }
  };

  //   handle form reset
  const handleReset = () => {
    const reset = {};
    Object.keys(formData).forEach((key) => (reset[key] = ""));
    setFormData(reset);
    setErrors({});
  };

  return (
    <div className="">
      <Heading>form validation</Heading>
      {/* form component  */}
      <form
        action=""
        onSubmit={handleSubmit}
        onReset={handleReset}
        className="bg-complimentaryBackground rounded-lg px-4 pt-12 pb-6 my-6"
      >
        {/* input feilds handling  */}
        {Object.keys(formData).map((key, index) => {
          if (!isSignup && (key === "name" || key === "confirmPassword"))
            return;
          return (
            <Input
              key={index}
              value={formData[key]}
              handler={handleChange}
              label={key + " feild"}
              labelBg="bg-complimentaryBackground"
              name={key}
              placeholder="enter here"
              type={
                key.includes("confirmPassword")
                  ? "password"
                  : key.includes("name")
                  ? "text"
                  : key
              }
              className="mb-6"
              errorLabel={errors[key]}
            />
          );
        })}
        <section className="flex items-center justify-center gap-8 my-6">
          <button
            type="submit"
            className={`p-2 px-6 text-lg md:text-xl capitalize border-2 rounded-lg text-success border-success bg-successTransparent`}
          >
            submit
          </button>
          <button
            type="reset"
            className={`p-2 px-6 text-lg md:text-xl capitalize border-2 rounded-lg text-error border-error bg-errorTransparent`}
          >
            reset
          </button>
        </section>
        <p
          onClick={() => setIsSignup((pre) => !pre)}
          className="text-secondaryText text-sm capitalize text-center p-2 cursor-pointer underline underline-offset-2 hover:text-accent"
        >
          {isSignup ? "sign up here" : "login here"}
        </p>
      </form>
    </div>
  );
};

export default FormValidationProject;
