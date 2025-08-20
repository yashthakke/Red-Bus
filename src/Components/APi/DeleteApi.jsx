import React, { useState } from 'react'
import { useFetchApi } from '../hooks/Cusgtomapi';
import axios from 'axios';
import { toast, ToastContainer, Bounce } from "react-toastify";
import { Loader } from '../Loader';

export const DeleteApi = () => {
      const [isLoading, setisLoading] = useState(false);
  
    // const {data,loading} = useFetchApi("https://dummyjson.com/products");

    const  {data,loding} = useFetchApi("https://dummyjson.com/products")
    console.log(data);
    console.log(loding);
    


   const userDelete = async (id) => {
  try {
    setisLoading(true);
    const res = await axios.delete(`https://dummyjson.com/products/${id}`);
    console.log(res.data); // Optional: See what was returned

    if (res.status === 200) {
      toast.success("Deleted successfully (mock)");
      // Ideally, re-fetch or filter the data here
    }
  } catch (error) {
    toast.error("Error deleting the item");
    console.error(error);
  } finally {
    setisLoading(false);
  }
};

    
  return (
    <div>ApiGet
           {isLoading && <Loader />}

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

    <table className='table table-dark'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>TiTle</th>
                    <th>PRICE</th>
                    <th>Action</th>
                </tr>
            </thead>
           <tbody>
          {data.map((product) => (
            <tr>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td><button className='btn btn-danger' onClick={()=>{userDelete(product.id)}}>DELETE</button></td>
            </tr>
          ))}
        </tbody>
        </table>

    
    
    
    </div>
  )
}
