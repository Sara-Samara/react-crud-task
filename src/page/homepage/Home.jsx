import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Loader from '../../component/loader/Loader';

export default function Home() {

   const [User , setUser] = useState([]);
   const [error , setError] = useState(null);
   const [isLoading , setLoading] = useState(true);

    const getUsers =async ()=>{
      try{
            const {data} =await axios.get('https://node-react-10.onrender.com/users');
            console.log(data);
            setUser(data.users);

      }
      catch(err){
            console.error(err);
            alert("Page Not Found ❌");
      }
      
      finally{
            setLoading(false);
      }
    }


    useEffect(()=>{
        getUsers();
    },[]);


    if(isLoading){
            return <Loader/>
    }  

    if(error){
            return (
                 <div style={{ color: 'red', fontWeight: 'bold' }}>
                  ⚠️ Error: {error}
                 </div>
            );
    }

    const DeleteUser = async (id)=>{
        const response = await axios.get(`https://node-react-10.onrender.com/users/${id}`);
        if(response.status ==200){
            
                toast.success('Delete Successfuly!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                });
        
        const newUsers = User.filter((user)=> user._id != id);
        setUser(newUsers);
            }
    }

    return (
        <div className="container mt-5">
            <table className="table table-striped border p-4 rounded shadow-sm bg-light">
                <thead>
                    <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">action</th>
                    </tr>
                </thead>
                <tbody>
                    {User.map((user) =>{
                    return(  <tr key={user._id}>
                        <td>{user.userName}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>
                        <Link className="btn bg-transparent border-0 no-radius text-info p-1" to={`/Details/${user._id}`}>Details</Link>
                        <button className="btn bg-transparent border-0 no-radius text-danger p-3" onClick={()=>DeleteUser(user._id)}>Delete</button>
                        <Link className="btn bg-transparent border-0 no-radius text-info p-1" to={`/Edit/${user._id}`}>Edit</Link></td>
                        </tr>

                    );

                    })}

                </tbody>
        </table>
    </div>
    );

}



