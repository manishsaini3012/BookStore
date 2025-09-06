import React from 'react';
import {Link } from "react-router-dom";
import axios from "axios";

const BookCard = ({data, favourites}) => {  
   const BACKEND_URL= process.env.BACKEND_URL;
   const headers={
     id:localStorage.getItem("id"),
     authorization: `Bearer ${localStorage.getItem("token")}`,
     bookid: data._id,
  };

  const handleRemoveBook = async() => {
    const response= await axios.put(
      `${BACKEND_URL}/remove-book-from-favourite`,
      {}, 
      {headers}
    );
    alert(response.data.message);
  };
  return (
    <div className='bg-zinc-800 rounded p-4 flex flex-col'>
    <Link to={`/view-book-details/${data._id}`}>
      <div className=''>
        <div className='bg-zinc-900 rounded flex items-center justify-center'>
          <img src={data.url} alt="/" className='h-[25vh]'/>
        </div>
        <h2 className='mt-4 text-l text-white font-semibold'>{data.title}</h2>
        <p className='mt-2 text-l text-zinc-500 font-semibold'>by {data.author}</p>
        <p className='mt-2 text-l text-zinc-100 font-semibold'>₹ {data.price}</p>
        </div>    
       
    </Link>
    {favourites && (
       <button 
       className='bg-slate-500 rounded px-2 py-1 border mt-3'
         onClick={handleRemoveBook}
        >
        Remove from favourite  
      </button>
    )
    }
    </div>
  ); 
  
}; 

export default BookCard


