import React from 'react'
import trash from '../Delete/delete.svg'
import { useCart, useDispatchCart } from '../Components/ContextReducer';


export default function Cart() {
  
    let data = useCart();
    let dispatch = useDispatchCart();
    if (data.length === 0) {
        return (
            <div>
                <div className='m-5 w-100 text-white text-center fs-3'>The Cart is Empty!</div>
            </div>
        )
    }
const handleCheckOut = async() =>{
   
    let userEmail = localStorage.getItem("userEmail");
    const response = await fetch("http://localhost:5000/api/orderData",{
        method:"POST",
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            order_data: data,
            email: userEmail,
            order_date: new Date().toDateString()
          })
    
    }

    );

    console.log("Order Response: " , response)
    if(response.status === 200)
    {
        dispatch({type:"DROP"})
    }
}




    let totalPrice = data.reduce((total, food) => total + food.price, 0)

    return (
        <div>

            <div className='container m-auto mt-5 table-responsive table-reponsive-sm table-responsive-md'>
                <table className='table table'>
                    <thead className='text-white fs-4'>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Quantity</th>
                            <th scope='col'>Option</th>
                            <th scope='col'>Amount</th>
                            <th scope='col'></th>
                        </tr>
                    </thead>
                    <tbody className='text-white'>
                        {data.map((food, index) => (
                            <tr>
                                <th scope='row'>{index + 1}</th>
                                <td >{food.name}</td>
                                <td>{food.qty}</td>
                                <td>{food.size}</td>
                                <td>{food.price}</td>
                                <td ><button type="button" className="btn p-0"> <img src={trash} alt="delete" style={{height:"50px", objectFit:"fill"}} onClick={() => {dispatch({type:"REMOVE", index: index})}}></img>
</button> </td></tr>
                        ))}
                    </tbody>


                </table>
                <div><h1 className='text-white fs-2'>Total Price: {totalPrice}/-</h1></div>
                <div>
                    <button className='btn bg-success mt-5 ' onClick={handleCheckOut} > Check Out </button>
                </div>
            </div>


        </div>






    )
}
