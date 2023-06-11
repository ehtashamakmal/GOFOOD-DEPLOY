import { useState } from "react"
import { Link , useNavigate} from 'react-router-dom'
import React from 'react'
import Navbar from "../Components/Navbar"

export default function Login() {



  const [credentials, setcredentials] = useState({ email: "", password: "" })
 
 let navigate = useNavigate()
  const handleSubmit = async (e) => {

    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/login", {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    })


    const json = await response.json()
    console.log(json);

    if (!json.success) {
      alert("Enter Valid Credentials")
    }
    if (json.success) {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate("/");

    }


  }



  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    
    <>
    <div style={{backgroundImage: 'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', height: '100vh', backgroundSize: 'cover' }}>
      <div>
        <Navbar/>
      </div>
      <div className='container'>
        
          <form className='w-50 m-auto mt-5 border bg-dark border-success rounded 'onSubmit={handleSubmit} >



            <div className="m-3">
              <label htmlFor="Email">Email address</label>
              <input type="email" className="form-control" name='email' value={credentials.email} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange} />
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="m-3">
              <label htmlFor="Password">Password</label>
              <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} placeholder="Password" />
            </div>





            <button type="submit" className=" m-3 btn btn-success">Submit</button>
            <Link to="/signup" className='m-3 btn btn-danger'> Dont have an Account?</Link>
          </form>
          
       











      </div>
    
      </div>
    </>
  )
}
