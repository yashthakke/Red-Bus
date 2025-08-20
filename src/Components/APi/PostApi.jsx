import React from 'react'
import { useForm } from 'react-hook-form'
import axios from "axios";
import { Bounce, toast, ToastContainer } from 'react-toastify'

export const PostApi = () => {
  const { register, handleSubmit } = useForm();

  const submitform = async (data) => {
    data.isAvailable = data.isActive === "true" ? true : false;

    data.colors = [data.colors];

 

    const res = await axios.post("https://node5.onrender.com/product/create",data);

    if (res.status === 201) {
      toast.success("Product added successfully!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />

      <h2>Post Product</h2>

      <form onSubmit={handleSubmit(submitform)}>
        <div  className="mb-3">
          <label>Choose a color:</label>
          <select {...register("colors")}>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="yellow">Yellow</option>
          </select>
        </div>

        <div>
          <label>Status</label>
          <br />
          ACTIVE: <input type="radio" {...register("isActive")}  />
          <br />
          NOT ACTIVE:{" "}
          <input type="radio" {...register("isActive")} />
        </div>

        <div  className="mb-3">
          <label>Unit</label>
          <input type="number" {...register("unit", )}/>
        </div>

        <div  className="mb-3">
          <label>Name</label>
          <input type="text" {...register("name")} />
        </div>

        <div>
          <label>Price</label>
          <input
            type="number"
            {...register("price", { valueAsNumber: true })}
          />
        </div>

        <div  className="mb-3">
          <label>Description</label>
          <input type="text" {...register("description")} />
        </div>

        <div  className="mb-3">
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};
