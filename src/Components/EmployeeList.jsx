import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    text: '',
    array: '',
    file: null
  });

  const fetchEmployees = async () => {
    try {
      const res = await axios.get('http://localhost:3000/emp');
      setEmployees(res.data);
    } catch (err) {
      console.error('Error fetching employees:', err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/emp/${id}`);
      setEmployees((prev) => prev.filter((emp) => emp._id !== id));
    } catch (err) {
      console.error('Error deleting employee:', err);
    }
  };

  const handleEdit = (emp) => {
    setEditingId(emp._id);
    setFormData({
      text: emp.text,
      array: emp.array.join(','),
      file: null
    });
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFormData({ ...formData, file: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updateData = new FormData();
      updateData.append('text', formData.text);
      updateData.append('array', JSON.stringify(formData.array.split(',')));
      if (formData.file) {
        updateData.append('file', formData.file);
      }

      await axios.put(`http://localhost:3000/emp/${editingId}`, updateData);
      setEditingId(null);
      setFormData({ text: '', array: '', file: null });
      fetchEmployees();
    } catch (err) {
      console.error('Error updating employee:', err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Employee List</h2>
      <table className="table table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>Text </th>
            <th>Array</th>
            <th>File </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">No employees found.</td>
            </tr>
          ) : (
            employees.map((emp) => (
              <tr key={emp._id}>
                <td>
                  <a href={`#view-${emp._id}`}>{emp.text}</a>
                </td>
                <td>
                  <ul>
                    {emp.array.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </td>
                <td>
                  {emp.file ? (
                    <a
                      href={`http://localhost:3000/uploads/${emp.file}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-outline-primary"
                    >
                      View
                    </a>
                  ) : (
                    <span className="text-muted">No file uploaded</span>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(emp)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(emp._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {editingId && (
        <div className="mt-4">
          <h4>Edit Employee</h4>
          <form onSubmit={handleUpdate} className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Text</label>
              <input
                type="text"
                name="text"
                className="form-control"
                value={formData.text}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Array (comma separated)</label>
              <input
                type="text"
                name="array"
                className="form-control"
                value={formData.array}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">File (optional)</label>
              <input
                type="file"
                name="file"
                className="form-control"
                onChange={handleInputChange}
              />
            </div>
            <div className="col-12">
              <button className="btn btn-success mt-3" type="submit">
                Update
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
