import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export const ViewcompanyDetails = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCompanies = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/admin/getdetail", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCompanies(res.data.data || []);
    } catch (error) {
      console.error("❌ Error fetching companies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  if (companies.length === 0) {
    return (
      <p className="text-center text-muted mt-4">No companies registered yet.</p>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="text-center text-primary fw-bold mb-4">Registered Companies</h2>

      <div className="row">
        {companies.map((company) => (
          <div className="col-md-6 col-lg-4 mb-4" key={company._id}>
            <div className="card shadow-sm h-100 border-0">
              <div className="card-header bg-white d-flex align-items-center">
                <div
                  className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center me-3"
                  style={{ width: "40px", height: "40px" }}
                >
                  <i className="bi bi-building"></i>
                </div>
                <div>
                  <h5 className="mb-0">{company.companyId?.companyName || "Unnamed Company"}</h5>
                  <small className="text-muted">{company.companyId?.email}</small>
                </div>
              </div>

              <div className="card-body">
                <h6 className="text-muted">Contact Information</h6>
                <p className="mb-1"><i className="bi bi-telephone me-2"></i>{company.ContactNumber}</p>
                {company.alternateNumber && (
                  <p className="mb-1"><i className="bi bi-telephone me-2"></i>{company.alternateNumber}</p>
                )}
                <p><i className="bi bi-geo-alt me-2"></i>
                  {company.address}, {company.city}, {company.state}, {company.country} - {company.pincode}
                </p>

                <hr />

                <h6 className="text-muted">Legal Details</h6>
                <p className="mb-1"><strong>Reg. No:</strong> {company.registrationNumber}</p>
                <p className="mb-1"><strong>GST:</strong> {company.gstNumber}</p>
                <p className="mb-1"><strong>License:</strong> {company.licenseNumber}</p>
                <p className="mb-1"><strong>Documents:</strong> {company.documents || "Not Uploaded"}</p>
                <p><strong>Expiry:</strong> {company.documentExpires ? new Date(company.documentExpires).toLocaleDateString() : "N/A"}</p>

                <hr />

                <h6 className="text-muted">Banking Details</h6>
                <p className="mb-1"><strong>Bank:</strong> {company.bankName}</p>
                <p className="mb-1"><strong>A/C:</strong> {company.accountNumber}</p>
                <p className="mb-1"><strong>IFSC:</strong> {company.ifscCode}</p>
                <p><strong>Payment Method:</strong> {company.paymentMethod || "Not Set"}</p>

                <hr />

                <div className="d-flex flex-wrap gap-2">
                  <span className="badge bg-primary">Buses: {company.totalBuses}</span>
                  <span className="badge bg-success">Revenue: ₹{company.totalRevenue}</span>
                  <span className="badge bg-warning text-dark">Rating: {company.rating}</span>
                </div>

                <small className="text-muted d-block mt-2">
                  Registered on {new Date(company.createdAt).toLocaleDateString()}
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
