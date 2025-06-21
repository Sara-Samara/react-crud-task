import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { data, Link, useParams } from 'react-router-dom';
import Loader from '../../component/loader/Loader';

export default function Details() {

    const { userId } = useParams(); 
    const [isLoading , setLoading] = useState(true);
    const [User , setUser] = useState({});

    const getDetails = async()=>{
            try{
                const {data} = await axios.get(`https://node-react-10.onrender.com/users/${userId}`);
                setUser(data.user);
            }
            catch(e){
                console.error(err);
                alert("Error creating user ❌");
            }
            finally{
                setLoading(false);
            }
    }


    useEffect(()=>{getDetails();},[]);

    if (isLoading) {return <Loader/>;}
    

    return (
  <div className="container mt-5 d-flex justify-content-center">
    <div className="card shadow-sm p-4" style={{ maxWidth: '600px', width: '100%' }}>

          <div className="text-center">
            <h3>{User.userName}</h3>
          </div>
          <hr />
          <div className="px-2">
            <p><strong>Email:</strong> {User.email}</p>
            <p><strong>Phone:</strong> {User.phone}</p>
            <p><strong>Member Since:</strong> {User.createdAt}</p>
          </div>
        
      <div className="text-center mt-4">
        <Link to="/" className="btn btn-secondary">Back to Dashboard</Link>
      </div>
    </div>
  </div>
);


}
