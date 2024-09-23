import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader/Loader';
import { AiFillDelete } from "react-icons/ai";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const cart = () => {
  const navigate=useNavigate();
  const [cart,setCart]=useState();
  const [total,setTotal]=useState(0);
  const headers={
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")} `,
    
  }
  useEffect(()=>{
    const fetch=async()=>{
      const res=await axios.get("http://localhost:1000/api/v1/get-user-cart",{headers})
      setCart(res.data.data);
    }
    fetch();
  },[cart])
  const deleteItem=async(bookid)=>{
    const res=await axios.put(`http://localhost:1000/api/v1/remove-from-cart/${bookid}`,
      {},
      {headers}
    )
    toast.success(res.data.message)
  }
  useEffect(()=>{
    if(cart && cart.length>0){
      let total=0;
      cart.map((items)=>{
        total+=items.price;
      });
      setTotal(total);
      total=0;
    }
  },[cart])
  const placeOrder=async ()=>{
    try{
      const res=await axios.post(
        `http://localhost:1000/api/v1/place-order`,
        {order:cart},
        {headers}
      )
      alert(res.data.message)
      navigate("/profile/orderHistory")
  
    }catch(err){
      console.log(err);
    }
  }
  return (
    <>
      <ToastContainer />

    <div className='bg-zinc-900 px-12 min-h-screen py-8'>
      
        {!cart && (<div className='w-full h-[100%] flex items-center justify-center my-8 '>
          <Loader />{" "}
          </div>)}
        {cart && cart.length==0 && (
          <div className="h-screen">
            <div className="h-[100%] flex items-center justify-center flex-col">
              <h1 className="text-3xl lg:text-4xl font-semibold text-zinc-400">
                Your Cart is Empty...
              </h1>
            </div>
          </div>
        )}
        {cart && cart.length>0 && (
          <>
            <h1 className="text-3xl font-semibold text-zinc-500 mb-8">
              Your Cart
            </h1>
            {cart.map((items,i)=>(
            <div className='w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center' key={i}>
              <img 
                src={items.url}
                alt='/'
                className='h-[20vh] md:h-[10vh] object-cover'
              />         
              <div className="w-full md:w-auto">
                <h1 className="text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0">
                  {items.title}
                </h1>
                <p className="text-normal text-zinc-300 mt-2 hidden lg:block">
                  {items.desc.slice(0,100)}...
                </p>
                <p className="text-normal text-zinc-300 mt-2 hidden md:block lg:hidden">
                  {items.desc.slice(0,65)}...
                </p>
                <p className="text-normal text-zinc-300 mt-2 block md:hidden">
                  {items.desc.slice(0,100)}...
                </p>
              </div>    
              <div className='flex mt-4 w-full md:w-auto items-center justify-between'>
                  <h2 className="text-zinc-100 text-2xl font-semibold flex">
                  ₹{items.price}
                  </h2>
                  <button className="bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12" 
                          onClick={()=>deleteItem(items._id)}
                  >
                    <AiFillDelete />
                  </button>
              </div>
            </div>
          ))}
          </>
          
        )}
        {cart && cart.length>0 &&(
          <div className="mt-4 w-full flex items-center justify-end">
            <div className="p-4 bg-zinc-800 rounded">
              <h1 className="text-3xl text-zinc-200 font-semibold">
                Total Amount
              </h1>
              <div className="wt-3 flex items-center justify-between mt-3 text-lg text-zinc-200">
                <h2>
                  {cart.length} books
                </h2>
                <h2>
                  ₹{total}
                </h2>
              </div>
              <div className="w-[100%] mt-3">
                <button className="bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-zinc-400"
                        onClick={placeOrder}  
                >
                  Place your order 
                </button>
              </div>
            </div>
          </div>
        )}
      
    </div>
    </>
  )
}

export default cart
