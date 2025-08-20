import React from "react";
import { useForm } from "react-hook-form";
import '../assets/Company.css';
import axios from "axios";
      import { Link } from "react-router-dom";



export const Company = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    defaultValues: {
      companyName: "",
      contactPerson: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      confirmPassword: ""
    }
  });

  // Validation rules using objects
  const validation = {
    companyName: {
      required: "Company Name is required"
    },
    contactPerson: {
      required: "Contact Person is required"
    },
    email: {
      required: "Email is required",
      pattern: {
        value: /^\S+@\S+$/i,
        message: "Invalid email address"
      }
    },
    phone: {
      required: "Phone number is required",
      minLength: {
        value: 10,
        message: "Phone number must be at least 10 digits"
      }
    },
    address: {
      required: "Address is required"
    },
    password: {
      required: "Password is required",
      minLength: {
        value: 6,
        message: "Password must be at least 6 characters"
      }
    },
    confirmPassword: {
      required: "Please confirm your password"
    }
  };

  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }


    const response = axios.post('http://localhost:3000/comp/register',data)
      console.log("✅ Booking Saved:", response.data);
    alert('Registration successful! Admin approval is needed.');

    console.log("Form Data:", data);
    // Make API call here to register operator
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Company / Operator Signup</h2>

        {/* Company Name */}
        <label>Company Name</label>
        <input
          type="text"
          {...register("companyName", validation.companyName)}
        />
        <p>{errors.companyName?.message}</p>

        {/* Contact Person */}
        <label>Contact Person</label>
        <input
          type="text"
          {...register("contactPerson", validation.contactPerson)}
        />
        <p>{errors.contactPerson?.message}</p>

        {/* Email */}
        <label>Email</label>
        <input type="email" {...register("email", validation.email)} />
        <p>{errors.email?.message}</p>

        {/* Phone */}
        <label>Phone Number</label>
        <input type="tel" {...register("phone", validation.phone)} />
        <p>{errors.phone?.message}</p>

        {/* Address */}
        <label>Company Address</label>
        <input type="text" {...register("address", validation.address)} />
        <p>{errors.address?.message}</p>

        {/* Password */}
        <label>Password</label>
        <input type="password" {...register("password", validation.password)} />
        <p>{errors.password?.message}</p>

        {/* Confirm Password */}
        <label>Confirm Password</label>
        <input
          type="password"
          {...register("confirmPassword", validation.confirmPassword)}
        />
        <p>{errors.confirmPassword?.message}</p>

        {/* Submit */}
        <button type="submit">Register</button>
      </form>


<Link to="/complgn">Already have an account?</Link>

    </div>
  );
};
