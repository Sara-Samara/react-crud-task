import React, { useEffect, useState } from 'react'; // هذا السطر لحاله كافي
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Loader from '../../component/loader/Loader';

export default function Edit() {
  const {register,handleSubmit , setValue } = useForm();
   const [isLoading , setLoading] = useState(true);
  const navigate = useNavigate();
  const { userId } = useParams(); 
    const getDetails = async()=>{
            try{
                const {data} = await axios.get(`https://node-react-10.onrender.com/users/${userId}`);
               setValue("userName" , data.user.userName);
            }
            catch(e){
                console.error(err);
                alert("Error creating user ❌");
            } 
            finally{
                setLoading(false);
            }
    };

    if (isLoading) {return <Loader/>;}

    useEffect(()=>{getDetails();},[]);

  const UpdateSubmit = async (value) => {
  try {
    const response = await axios.put(`https://node-react-10.onrender.com/users/${userId}`, value);
    navigate('/');

    if(response.status ==200){
                toast.success('User updated successfully!', {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                });
    }
    

  } catch (e) {
    alert('Update failed: ' + e.message);
  }
};

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Update User</h2>

      <form onSubmit={handleSubmit(UpdateSubmit)} className="border p-4 rounded shadow-sm bg-light">
        {/* Username */}
        <div className="mb-3">
          <label htmlFor="userName" className="form-label">Username</label>
          <input
            {...register('userName')}
            type="text"
            className="form-control"
            id="userName"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Edit</button>
      </form>
    </div>
  )
}
