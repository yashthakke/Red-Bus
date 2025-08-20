import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Companyregistration = () => {
  const [employees, setEmployees] = useState([]);
  const [LoadingId, setLoadingId] = useState(null)

  const fetchEmployees = async () => {
    try {
      const res = await axios.get('http://localhost:3000/admin/pending');
      setEmployees(res.data.data);
    } catch (err) {
      console.error('Error fetching employees:', err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);


  const approveUser = async (id) => {
  setLoadingId(id);
  try {
    await axios.put(`http://localhost:3000/admin/approved/${id}`, {
      status: 'approved' 
    });
    alert('Company approved successfully!');
    fetchEmployees();
  } catch (err) {
    alert('Failed to approve company.');
    console.error(err);
  } finally {
    setLoadingId(null);
  }
};

const rejecteduser = async (id) => {
  setLoadingId(id);
  try {
    await axios.delete(`http://localhost:3000/admin/reject/${id}`, {
      data: { status: 'rejected' }
    });
    alert('Company rejected successfully!');
    fetchEmployees();
  } catch (err) {
    alert('Failed to reject company.');
    console.error(err);
  } finally {
    setLoadingId(null);
  }
};



  return (
    <div className="container mt-5">
      <style>
        {`
        .custom-table {
          border: 2px solid #053361ff;
        }
        .custom-table th, .custom-table td {
          padding: 1rem;
        }
        `}
      </style>
      <div className="card shadow-sm">
        <div className="card-header bg-white border-bottom">
          <h2 className="mb-4 text-dark  bold">Pending Company Registrations</h2>
           <hr className="my-2" />
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover table-striped mb-0 custom-table">
              <thead className="table-light">
                <tr>
                  <th>Company Name</th>
                  <th>Contact Person</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {employees.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="text-center text-muted py-4">
                      No pending registrations found.
                    </td>
                  </tr>
                ) : (
                  employees.map((emp) => (
                    <tr key={emp._id}>
                      <td>{emp.companyName}</td>
                      <td>{emp.contactPerson}</td>
                      <td>{emp.email}</td>
                      <td>{emp.phone}</td>
                      <td>{emp.address}</td>
                      <td><span className="badge bg-info text-dark">{emp.status}</span></td>
                      <td className="text-center">
                        <div className="btn-group" role="group" aria-label="Action buttons">
                          <button onClick={() =>approveUser(emp._id)} className="btn btn-sm btn-outline-success">Approve</button>
                          <button  onClick={()=>rejecteduser(emp._id)} className="btn btn-sm btn-outline-danger">Decline</button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};