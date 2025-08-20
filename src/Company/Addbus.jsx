import React from 'react';
import { useForm } from 'react-hook-form';
import '../assets/AddBus.css';
import axios from 'axios';

export const Addbus = () => {
  const { register, handleSubmit } = useForm();

  const submitData = async (data) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        'http://localhost:3000/comp/addbus',
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      alert("Successfully added");
      console.log(response);
    } catch (error) {
      console.error("❌ Adding bus failed:", error);
    }
  };

  return (
    <div className="addbus-container">
      <h2 className="form-title">Add Bus</h2>
      <form className="addbus-form" onSubmit={handleSubmit(submitData)}>
        {/* Basic Bus Information */}
        <h3>Basic Bus Information</h3>
        <label>Bus Name</label> <input type="text" {...register("busName")} />
        <label>Bus Type</label>
        <select {...register("busType")}>
          <option value="">Select bus type</option>
          <option value="AC">AC</option>
          <option value="Non-AC">Non-AC</option>
        </select>
        <label>Bus Category</label>
        <select {...register("busCategory")}>
          <option value="">Select category</option>
          <option value="Sleeper">Sleeper</option>
          <option value="Seater">Seater</option>
        </select>
        <label>Operator Name</label> <input type="text" {...register("operatorName")} />
        <label>Registration Number</label> <input type="text" {...register("registrationNumber")} />
        
        {/* Removed: Bus Image input */}

        <label htmlFor="">busImage</label>
        <input type="file" {...register("busImage")}  />

        {/* Seating & Layout */}
        <h3>Seating & Layout</h3>
        <label>Total Seats</label> <input type="number" {...register("totalSeats")} />
        <label>Seating Layout</label>
        <select {...register("seatingLayout")}>
          <option value="">Select layout</option>
          <option value="2x2">2x2</option>
          <option value="2x1">2x1</option>
          <option value="1x1">1x1</option>
        </select>

        {/* Amenities & Facilities */}
        <h3>Amenities & Facilities</h3>
        <div className="checkbox-group">
          <label><input type="checkbox" {...register("amenities.wifi")} /> Wi-Fi</label>
          <label><input type="checkbox" {...register("amenities.chargingPoint")} /> Charging Point</label>
          <label><input type="checkbox" {...register("amenities.readingLight")} /> Reading Light</label>
          <label><input type="checkbox" {...register("amenities.blanket")} /> Blanket & Pillow</label>
          <label><input type="checkbox" {...register("amenities.entertainment")} /> Entertainment</label>
          <label><input type="checkbox" {...register("amenities.cctv")} /> CCTV Camera</label>
          <label><input type="checkbox" {...register("amenities.luggageStorage")} /> Luggage Storage</label>
        </div>

        {/* Route & Scheduling */}
        <h3>Route & Scheduling (Per Service)</h3>
        <label>Starting Point</label> <input type="text" {...register("startingPoint")} />
        <label>Ending Point</label> <input type="text" {...register("endingPoint")} />
        <label>Intermediate Stops</label> <input type="text" {...register("stops")} placeholder="ex: City A, City B" />
        <label>Departure Time</label> <input type="time" {...register("departureTime")} />
        <label>Arrival Time</label> <input type="time" {...register("arrivalTime")} />


        <h3>Additional Bus Settings</h3>

        <label>Frequency</label>
        <select {...register("frequency")}>
          <option value="Daily">Daily</option>
          <option value="Weekdays">Weekdays</option>
          <option value="Weekends">Weekends</option>
          <option value="Custom">Custom</option>
        </select>

        <label>Days of Operation</label>
        <input type="text" {...register("daysOfOperation")} placeholder="Ex: 0,1,2,3,4 (0=Sunday)" />

        <label>Initial Rating</label>
        <input type="number" step="0.1" {...register("rating")} defaultValue={0} />

        <label>Total Bookings</label>
        <input type="number" {...register("totalBookings")} defaultValue={0} />

        <label>Cancellation Policy</label>
        <textarea {...register("cancellationPolicy")} placeholder="Enter policy details..." />

        <label>Refund Available</label>
        <select {...register("refundAvailable")}>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select> 

        <button type="submit" className="submit-btn">Add Bus</button>
      </form>
    </div>
  );
};
