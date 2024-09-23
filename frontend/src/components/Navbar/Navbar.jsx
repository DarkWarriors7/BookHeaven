import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaGripLines } from "react-icons/fa";
import { useSelector } from 'react-redux';



const Navbar = () => {
    const links=[
        {
            title:"Home",
            link:"/"
        },
        {
            title:"All Books",
            link:"/all-books"
        },
        {
            title:"Cart",
            link:"/cart"
        },
        {
            title:"Profile",
            link:"/profile"
        },
        {
            title:"Admin Profile",
            link:"/profile"
        }
    ];

    const isLoggedIn=useSelector((state)=>state.auth.isLoggedIn);
    const role =useSelector((state)=>state.auth.role);
    const [mobileNav,setMobileNav]= useState("hidden")


    if(isLoggedIn===false){
        links.splice(2,3);
    }
    if(isLoggedIn===true && role==="user"){
        links.splice(4,1);
    }
    if(isLoggedIn===true && role==="admin"){
        links.splice(3,1);
    }

  return (
    <>
        <nav className='z-50 relative bg-zinc-800 text-white px-8 py-4 flex items-center justify-between'>
            <Link to="/" className="flex items-center">
                <img 
                src="../../../src/assets/Logo.avif" 
                alt="logo" 
                className="h-10 me-4" />
                <h1 className="text-2xl font-semibold">BookHeaven</h1>
            </Link>
        <div className="nav-links-bookheaven block md:flex items-center gap-4 ">
            <div className="hidden md:flex gap-4">

                {links.map((items,i)=>(
                    <div>

                        {items.title==="Profile" || items.title==="Admin Profile" ?
                            <Link
                            to={items.link}
                            className='px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'
                            key={i}>
                                {items.title}
                        </Link>:<Link
                        to={items.link}
                        className='hover:text-blue-500 transition-all duration-300'
                        key={i}>
                            {items.title}
                    </Link>}
                    </div>
                ))}
            </div>
            {isLoggedIn===false && <div className='hidden md:flex gap-4'>
                <Link to="/Login" className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300">LogIn</Link>
                <Link to="/Signup" className="px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300">SignUp</Link>
            </div>}
            <button className="text-white text-2xl hover:text-zinc-400 block md:hidden" 
                onClick={()=>mobileNav==="hidden"?setMobileNav("block"):setMobileNav("hidden")}>
                <FaGripLines />
            </button>
        </div>
        </nav>
        <div className={`${mobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}>
            {links.map((items,i)=>(
                        <div>
                            {items.title==="Profile"?<Link
                            to={items.link} onClick={()=>mobileNav==="hidden"?setMobileNav("block"):setMobileNav("hidden")}
                            className={`${mobileNav} px-8 py-2 mb-8 text-2xl font-semibold border border-blue-500 rounded text-white hover:bg-white hover:text-zinc-800 transition-all duration-300`}
                            key={i}>
                                {items.title}
                        </Link>:<>
                        <Link
                            to={items.link} onClick={()=>mobileNav==="hidden"?setMobileNav("block"):setMobileNav("hidden")}
                            className={`${mobileNav} text-white text-3xl mb-8 font-semibold hover:text-blue-500 transition-all duration-300`}
                            key={i}>
                                {items.title}
                        </Link>
                        </>
                        
                    }
                        </div>
            ))}
            {isLoggedIn===false &&
                <>
                <Link to="/Login" onClick={()=>mobileNav==="hidden"?setMobileNav("block"):setMobileNav("hidden")} className={`${mobileNav} px-8 py-2 mb-8 text-2xl font-semibold border border-blue-500 rounded text-white hover:bg-white hover:text-zinc-800 transition-all duration-300`}>LogIn</Link>
                <Link to="/Signup" onClick={()=>mobileNav==="hidden"?setMobileNav("block"):setMobileNav("hidden")} className={`${mobileNav} px-8 py-2 mb-8 text-2xl font-semibold bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300`}>SignUp</Link></>               
            }
            
            
        </div>
    </>
  )
}

export default Navbar
