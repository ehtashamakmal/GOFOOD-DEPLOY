import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar'


export default function Signup() {
    let navigate = useNavigate()
    const [credentials, setcredentials] = useState({ name: "", email: "", password: "", geolocation: "" })
    const handleSubmit = async (e) => {

        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/createuser", {

            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },

            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })
        })


        const json = await response.json()
        console.log(json);
        navigate("/login");

        if (!json.success) {
            alert("Enter Valid Credentials")
        }

    }



    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    
    return (
        <>

            <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover', height: '100vh' }}>

                <div>

                    <Navbar />
                </div>
                <div className='container'>


                    <div>
                        <form className=" w-50 m-auto mt-5 border bg-dark border-success rounded" onSubmit={handleSubmit}>
                            <div className="m-3">
                                <label htmlFor="name">Name</label>
                                <input type="text" className="form-control" placeholder="Enter Name" name='name' value={credentials.name} onChange={onChange} />

                            </div>


                            <div className="m-3">
                                <label htmlFor="Email">Email address</label>
                                <input type="email" className="form-control" name='email' value={credentials.email} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange} />
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div className="m-3">
                                <label htmlFor="Password">Password</label>
                                <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} placeholder="Password" />
                            </div>



                            <div className="m-3">
                                <label htmlFor="Address">Address</label>
                                <input type="text" className="form-control" name='geolocation' value={credentials.geolocation} onChange={onChange} placeholder="Address" />
                            </div>

                            <button type="submit" className=" m-3 btn btn-success">Submit</button>
                            <Link to="/login" className='m-3 btn btn-danger'> Already a User</Link>
                        </form>
                    </div>











                </div>
            </div>
        </>
    )


}
