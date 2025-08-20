import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../assets/ViewBus.css';

export const ViewBus = () => {
  const [viewBus, setViewBus] = useState([]);
  const [loading, setLoading] = useState(true);
   const [search, setSearch] = useState("");
     const [priceSort, setpriceSort] = useState('')


  const fetchBuses = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/comp/viewbus", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setViewBus(response.data.data || []);
    } catch (error) {
      console.error("Error fetching buses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBuses();
  }, []);


  const sortPrice = (event)=>{
    const newval = event.target.value
    setpriceSort(newval)
  }


  
  return (
    <div className="viewbus-container">
      <h2 className="viewbus-title">🚌 View Buses</h2>


      <div  className="filter-bar">
        <input type="search"  placeholder="🔍 Search by bus name, source, destination..." value={search}  onChange={(e)=>setSearch(e.target.value)}
          />

           <select value={priceSort} onChange={sortPrice}>
    <option value="">Sort by Seats</option>
    <option value="asc">Low to High</option>
    <option value="desc">High to Low</option>
  </select>


      </div>

      {loading ? (
        <p className="loading-text">Loading buses...</p>
      ) : viewBus.length === 0 ? (
        <p className="no-bus-text">No buses found.</p>
      ) : (
        <div className="bus-card-grid">
          {viewBus.map((bus) => (
            <div className="bus-card" key={bus._id}>
              <div className="bus-image-wrapper">
                {bus.busImage ? (
                  <img src={bus.busImage} alt="Bus" className="bus-img" />
                ) : (
                  <span className="no-img">No image</span>
                )}
              </div>

              <h3 className="bus-name">{bus.busName}</h3>
              <p><strong>Type:</strong> {bus.busType}</p>
              <p><strong>Category:</strong> {bus.busCategory}</p>
              <p><strong>Operator:</strong> {bus.operatorName}</p>
              <p><strong>Reg. Number:</strong> {bus.registrationNumber}</p>
              <p><strong>Total Seats:</strong> {bus.totalSeats}</p>
              <p><strong>Layout:</strong> {bus.seatingLayout}</p>
              <p><strong>Route:</strong> {bus.startingPoint} → {bus.endingPoint}</p>
              <p><strong>Stops:</strong> {bus.stops?.join(", ") || "None"}</p>
              <p><strong>Departure:</strong> {bus.departureTime}</p>
              <p><strong>Arrival:</strong> {bus.arrivalTime}</p>
              <p><strong>Frequency:</strong> {bus.frequency || "Daily"}</p>
              <p><strong>Days:</strong> {bus.daysOfOperation}</p>
              <p>
                <strong>Amenities:</strong>{" "}
                {Object.entries(bus.amenities || {})
                  .filter(([_, value]) => value)
                  .map(([key]) => key)
                  .join(", ") || "None"}
              </p>
              <p><strong>Rating:</strong> {bus.rating || 0} ⭐</p>
              <p><strong>Bookings:</strong> {bus.totalBookings || 0}</p>
              <p><strong>Cancellation:</strong> {bus.cancellationPolicy || "Not specified"}</p>
              <p className={bus.refundAvailable ? "refund-yes" : "refund-no"}>
                <strong>Refund:</strong> {bus.refundAvailable ? "✅ Yes" : "❌ No"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
