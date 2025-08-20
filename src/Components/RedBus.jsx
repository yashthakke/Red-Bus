import axios from 'axios';
import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import '../assets/RedBusBooking.css';


export const RedBus = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const {register,handleSubmit, control, trigger, watch,formState: { errors }} = useForm({
    defaultValues: { place: "", to: "", releaseDate: "", returnDate: "",
      busType: "",
      payment: "",
      passengers: [
        {
          name: "",
          age: "",
          gender: "",
          phoneNumber: "",
          idType: "",
          meal: ""
        }
      ]
    }
  });

  const output = watch();

  const { fields, append } = useFieldArray({
    control,
    name: "passengers"
  });

  const Bookingsubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/RedBus/addData", data);
      console.log("✅ Booking Saved:", response.data);
      alert("🎉 Booking Successful and saved to DB!");
    } catch (error) {
      console.error("❌ Failed to save booking:", error);
      alert("❌ Booking failed. Try again.");
    } 
  };

  const nextStep = async () => (await trigger()) && setStep((prev) => prev + 1);
  const prevStep = () => step > 1 && setStep(step - 1);

  const validationSchema = {
    fromValidate: { required: { value: true, message: "Select departure city" } },
    ToValidate: { required: { value: true, message: "Select destination city" } },
    RealseValidate: {
      required: { value: true, message: "Journey Date is required" },
      validate: (value) => new Date(value) >= new Date() || "Date must be in the future"
    },
    returnDate: { required: { value: true, message: "Return Date is required" } },
    TypeValidate: { required: { value: true, message: "Bus type is required" } },
    paymentValidate: { required: { value: true, message: "Payment method is required" } },
    NameValidate: { required: { value: true, message: "Name is required" } },
    AgeValidate: {
      required: { value: true, message: "Age is required" },
      pattern: {
        value: /^[0-9]{1,3}$/,
        message: "Invalid Age"
      }
    }
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h2 className="text-primary fw-bold">🚌 RedBus Booking</h2>
        <p className="text-muted">Book your journey with ease and comfort</p>
      </div>

      <form onSubmit={handleSubmit(Bookingsubmit)} className="bg-white shadow rounded p-4">
        {step === 1 && (
          <div className="row g-4">
            <div className="col-md-6">
              <label className="form-label">From</label>
              <select {...register("place", validationSchema.fromValidate)} className="form-select">
                <option value="">Select departure city</option>
                <option value="Delhi">Delhi</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Chennai">Chennai</option>
                <option value="Kolkata">Kolkata</option>
              </select>
              <span className="text-danger">{errors.place?.message}</span>
            </div>

            <div className="col-md-6">
              <label className="form-label">To</label>
              <select {...register("to", validationSchema.ToValidate)} className="form-select">
                <option value="">Select destination city</option>
                <option value="Delhi">Delhi</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Chennai">Chennai</option>
                <option value="Kolkata">Kolkata</option>
              </select>
              <span className="text-danger">{errors.to?.message}</span>
            </div>

            <div className="col-md-6">
              <label className="form-label">Journey Date</label>
              <input type="date" className="form-control" {...register("releaseDate", validationSchema.RealseValidate)} />
              <span className="text-danger">{errors.releaseDate?.message}</span>
            </div>

            <div className="col-md-6">
              <label className="form-label">Return Date</label>
              <input type="date" className="form-control" {...register("returnDate", validationSchema.returnDate)} />
              <span className="text-danger">{errors.returnDate?.message}</span>
            </div>

            <div className="col-md-6">
              <label className="form-label">Bus Type</label>
              <select className="form-select" {...register("busType", validationSchema.TypeValidate)}>
                <option value="">Select bus type</option>
                <option value="AC">AC</option>
                <option value="Non-AC">Non-AC</option>
                <option value="Sleeper">Sleeper</option>
                <option value="Seater">Seater</option>
                <option value="AC Sleeper">AC Sleeper</option>
                <option value="Non-AC Sleeper">Non-AC Sleeper</option>
                <option value="AC Seater">AC Seater</option>
              </select>
              <span className="text-danger">{errors.busType?.message}</span>
            </div>

            <div className="col-md-6">
              <label className="form-label">Payment Method</label>
              <select className="form-select" {...register("payment", validationSchema.paymentValidate)}>
                <option value="">Select payment method</option>
                <option value="UPI">UPI</option>
                <option value="Card">Card</option>
                <option value="Cash">Cash</option>
              </select>
              <span className="text-danger">{errors.payment?.message}</span>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            {fields.map((item, index) => (
              <div key={index} className="card mb-4 border-start border-4 border-info bg-light">
                <div className="card-body">
                  <h5 className="text-primary mb-3">Passenger {index + 1}</h5>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Full name"
                        {...register(`passengers.${index}.name`, validationSchema.NameValidate)}
                      />
                      <span className="text-danger">{errors.passengers?.[index]?.name?.message}</span>
                    </div>

                    <div className="col-md-3">
                      <label className="form-label">Age</label>
                      <input
                        type="number"
                        className="form-control"
                        {...register(`passengers.${index}.age`, validationSchema.AgeValidate)}
                      />
                      <span className="text-danger">{errors.passengers?.[index]?.age?.message}</span>
                    </div>

                    <div className="col-md-3">
                      <label className="form-label">Gender</label>
                      <select className="form-select" {...register(`passengers.${index}.gender`)}>
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Contact Number</label>
                      <input
                        type="text"
                        className="form-control"
                        {...register(`passengers.${index}.phoneNumber`, {
                          required: "Phone number is required",
                          pattern: {
                            value: /^[0-9]{10}$/,
                            message: "Phone number must be 10 digits"
                          }
                        })}
                      />
                      <span className="text-danger">{errors.passengers?.[index]?.phoneNumber?.message}</span>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Meal Preference</label>
                      <select className="form-select" {...register(`passengers.${index}.meal`)}>
                        <option value="">Select Meal</option>
                        <option value="Veg">Veg</option>
                        <option value="Non-Veg">Non-Veg</option>
                        <option value="None">None</option>
                      </select>
                    </div>
<div>

  { <select
  className="form-select"
  {...register(`passengers.${index}.idType`, {
    required: "ID type is required"
  })}
>
  <option value="">Select ID Type</option>
  <option value="Aadhar">Aadhar</option>
  <option value="Passport">Passport</option>
  <option value="Driving License">Driving License</option>
  <option value="Other">Other</option>
</select> }

  {/* <div className="col-md-6">
                      <label className="form-label">ID type</label>
                      <input type="file" name="" id=""   {...register(`passengers.${index}.idtype`)} />
                      
                    </div> */}


<span className="text-danger">{errors.passengers?.[index]?.idType?.message}</span>

</div>

                  </div>
                </div>
              </div>
            ))}
            <div className="text-center mb-4">
              <button
                type="button"
                className="btn btn-outline-success px-4 py-2"
                onClick={() =>
                  append({
                    name: "",
                    age: "",
                    gender: "",
                    phoneNumber: "",
                    idType: "",
                    meal: ""
                  })
                }
              >
                + Add Passenger
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 className="mb-4">🧾 Confirm Booking Details</h3>
            <div className="p-4 bg-light border rounded">
              <h4>🛫 From: {output.place}</h4>
              <h4>🛬 To: {output.to}</h4>
              <h4>📅 Journey Date: {output.releaseDate}</h4>
              <h4>🔁 Return Date: {output.returnDate}</h4>
              <h4>🚌 Bus Type: {output.busType}</h4>
              <h4>💳 Payment Method: {output.payment}</h4>
              <hr />
              <h5 className="text-secondary">👤 Passengers</h5>
              {output.passengers?.map((p, i) => (
                <div key={i} className="mb-3">
                  <strong>{i + 1}. {p.name}</strong> - {p.age} yrs - {p.gender} - 📞 {p.phoneNumber} - 🍱 {p.meal} - 🆔 {p.idType}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="text-center mt-4">
          {step > 1 && <button type="button" className="btn btn-secondary me-3" onClick={prevStep}>← Back</button>}
          {step < 3 && <button type="button" className="btn btn-primary" onClick={nextStep}>Next →</button>}
          {step === 3 && (
            <button type="submit" className="btn btn-success" disabled={loading}>
              {loading && <span className="spinner-border spinner-border-sm me-2"></span>}
              Confirm & Book
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
