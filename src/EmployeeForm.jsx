import React from 'react';
import axios from 'axios';
import { useForm, useFieldArray } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';

export const EmployeeForm = () => {
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      text: '',
      array: [''],
      file: null,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'array',
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('text', data.text);
    formData.append('file', data.file[0]);

    data.array.forEach((item, index) => {
      formData.append(`array[${index}]`, item);
    });

    try {
      const res = await axios.post('http://localhost:3000/emp/addData', formData);
      console.log('✅ Submitted:', res.data);
      reset();
    } catch (err) {
      console.error('❌ Submission error:', err);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Add Employee</h3>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="border p-4 rounded shadow-sm bg-light">

        <div className="mb-3">
          <label className="form-label">Text:</label>
          <input type="text" {...register('text')} className="form-control" placeholder="Enter text" required />
        </div>

        <div className="mb-3">
          <label className="form-label">Array Items:</label>
          {fields.map((field, index) => (
            <div key={field.id} className="input-group mb-2">
              <input
                {...register(`array.${index}`)}
                className="form-control"
                placeholder={`Item ${index + 1}`}
              />
              <button type="button" className="btn btn-danger" onClick={() => remove(index)}>❌</button>
            </div>
          ))}
          <button type="button" className="btn btn-outline-primary mt-2" onClick={() => append('')}>
            ➕ Add More
          </button>
        </div>

        <div className="mb-4">
          <label className="form-label">File:</label>
          <input
            type="file"
            {...register('file')}
            accept=".jpg,.jpeg,.png,.pdf"
            className="form-control"
            required
          />
        </div>

        <button type="submit" className="btn btn-success">Submit</button>
      </form>
    </div>
  );
};
