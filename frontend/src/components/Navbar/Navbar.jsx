import React from 'react'
import { NavLink } from 'react-router-dom';
import { FaGripLines } from "react-icons/fa";
import { useState } from 'react';
import { useSelector } from 'react-redux';




const Navbar = () => {
    const links=[
        {
            title:"Home",
            link:"/",
        },
        // {
        //     title:"About Us",
        //     link:"/about-us",
        // },
        {
            title:"All Books",
            link:"/all-books",
        },
        {
            title:"Cart",
            link:"/cart",
        },
        {
            title:"Profile",
            link:"/profile",
        },
        {
            title:"Admin Profile",
            link:"/profile",
        },
    ];
    const isLoggedIn= useSelector((state)=> state.auth.isLoggedIn);
    const role= useSelector((state)=> state.auth.role);
    if(isLoggedIn === false){
      links.splice(2,3);
    }

    if(isLoggedIn == true && role === "user")
      {
      links.splice(4,1);
    }
    if(isLoggedIn == true && role === "admin")
      {
      links.splice(3,1);
    }

    const[MobileNav,setMobileNav]= useState("hidden");
  return (
    <>
    <nav className='z-50 relative flex bg-gray-500 text-white px-8 py-4 items-center justify-between'>
      <NavLink to="/" className='flex items-center'>
        <img className='h-10 me-4'
        src="https://cdn-icons-png.flaticon.com/512/18957/18957230.png" alt="logo" />
        <h1 className='text-2xl font-semibold'>BookStore</h1>
      </NavLink>

      <div className='nav-links-bookstore block md:flex items-center gap-4'>
           <div className='hidden md:flex gap-4'>   
             {links.map((items,i)=>(
           <div className='flex items-center justify-center'>
            {items.title ==="Profile" || items.title ==="Admin Profile" ?<NavLink
             to={items.link}
            className='px-4  py-1 bg-blue-400 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300' 
            key={i}>{items.title} 
            </NavLink>:<NavLink
             to={items.link}
            className='hover:text-blue-500 transition-all duration-200' 
            key={i}>{items.title} {" "}</NavLink>}     
           </div>
        ))} 
        </div>
           {isLoggedIn===false &&(
            <>
            <div className='hidden md:flex gap-4'>
            <NavLink to="SignUp"
             className='px-4  py-1 bg-blue-400 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300' >SignUp</NavLink>
            <NavLink to="LogIn"
             className='px-4 py-1 border border-blue-400 rounded  hover:bg-white hover:text-zinc-800 transition-all duration-300 ' >LogIn</NavLink>
           </div>  
            </>
            )}  
           <button className='block md:hidden text-white text-2xl hover:text-zinc-400' 
           onClick={()=> MobileNav === "hidden" 
           ? setMobileNav("block")
           :setMobileNav("hidden")}
           >
            <FaGripLines /></button>
      </div>
    
    </nav>
    <div className={`${MobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}>
    {links.map((items,i)=>(
            <NavLink
             to={items.link}
            className={`${MobileNav} text-white text-4xl font font-semibold mb-8  hover:text-blue-500 transition-all duration-300`} 
            key={i}
            onClick={()=> MobileNav === "hidden" 
              ? setMobileNav("block")
              :setMobileNav("hidden")}
            
            
            >{items.title} {" "}</NavLink>     
        ))} 
        
           {isLoggedIn=== false && (
            <>
             <NavLink to="SignUp"
             className={`${MobileNav} px-8 mb-8 text-4xl font-semibold py-2 bg-blue-400 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300`} >SignUp</NavLink>
            <NavLink to="LogIn"
             className={`${MobileNav} px-8 mb-8 text-4xl font-semibold py-2 border border-blue-400 rounded  hover:bg-white hover:text-zinc-800 transition-all duration-300`} >LogIn</NavLink>
          
            </>
           )}
    </div>
    </>
  );
};

export default Navbar;
