import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from '../../component/loader/Loader';

export default function Create() {
  const { register, handleSubmit } = useForm();
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(false);
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_Base_URL}/users`, data);
      alert("User created successfully ✅");
      navigate('/');
    }
    catch (err) {
      console.error(err);
      alert("Error creating user ❌");
    }
    finally {
      setLoading(false);
    }
  }

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Create New User</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="border p-4 rounded shadow-sm bg-light">
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

        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            {...register('email')}
            type="email"
            className="form-control"
            id="email"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            {...register('password')}
            type="password"
            className="form-control"
            id="password"
            required
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input
            {...register('phone')}
            type="text"
            className="form-control"
            id="phone"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Create</button>
      </form>
    </div>
  );
}
