import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const GetApi = () => {

    const [user, setuser] = useState([])

    useEffect(()=>{getinfo()},[]) // it works like constructot it will automatically called when page is load 
    // AND IF WE WANT TO USE IF MULTIPLE TIME THAN WE CAN USE[]
     
    const getinfo = async() =>
    {

        const res = await axios.get("https://node5.onrender.com/product/getall")
        setuser(res.data.data)


    }
  return (
    <div>GetApi




            <table className='table table-dark'>
                <thead>
                    <tr>
                        <th>Colors</th>
                        <th>isAvailable</th>
                        <th>Unit</th>
                        <th>Name</th>
                        <th>price</th>
                        <th>DEscription</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        user.map((user)=>{
                            return <tr>
                                <td>{user.colors}</td>
                                <td> {user.isAvailable  ? "Active" :"NOt Active"}  </td>
                                <td> {user.unit}  </td>
                                <td>  {user.name} </td>
                                                                <td>  {user.price} </td>


                                <td>  {user.description}</td>
                            </tr>
                        })
                    }
                </tbody>

            </table>
    </div>
  )
}
