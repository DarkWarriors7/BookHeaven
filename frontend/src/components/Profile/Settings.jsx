import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Settings = () => {
  const [Value,setValue]=useState({address:""});
  const [profile, setProfile]=useState();

  const headers={
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")} `
  }
  const change=(e)=>{
    const {name,value}=e.target;
    
    setValue({...Value,[name]:value})
  };
  useEffect(()=>{
    const fetch=async()=>{
      const res=await axios.get(
        "http://localhost:1000/api/v1/get-user-info",
        {headers}
      )
      setProfile(res.data)
      setValue({address:res.data.address})
    }
    fetch()
  },[])
  

  const handleUpdate=async ()=>{
      const res=await axios.put(
        "http://localhost:1000/api/v1/update-address",
        
        Value,
        {headers},
        
      )
      toast.success(res.data.message)
      
      
  }
  return (
    <>
      <ToastContainer />
     {!profile && (
      <div className="w-full h-[100%] flex items-center justify-center">
        <Loader />
      </div>
     )} 
     {profile && (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            Settings
          </h1>
        <div className="flex gap-12">
          <div className="">
            <label htmlFor=''>Username</label>
            <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">
              {profile.username}
            </p>
          </div>
          <div className="">
            <label htmlFor=''>Email</label>
            <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">
              {profile.email}
            </p>
          </div>
        </div>
          <div className="mt-4 flex flex-col">
            <label htmlFor="">Address</label>
            <textarea 
              className='p-2 rounded bg-zinc-800 mt-2 font-semibold'
              rows="5"
              placeholder='Address'
              name='address'
              value={Value.address}
              onChange={change}
            />
            <div className="mt-4 flex justify-end">

              <button className='bg-yellow-500 text-zinc-900 px-3 py-2 font-semibold rounded  hover:bg-yellow-400 mt-4'
                      onClick={handleUpdate}
              >
                Update
            </button>
            </div>
          </div>
        </div>
     )}
      
    </>
  )
}

export default Settings
