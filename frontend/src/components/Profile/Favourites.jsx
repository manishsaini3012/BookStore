import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from "axios";
import BookCard from '../BookCard/BookCard';

const Favourites = () => {
   const BACKEND_URL= process.env.BACKEND_URL;
  const [FavouriteBooks, setFavouriteBooks] = useState();
  const headers={
     id:localStorage.getItem("id"),
     authorization: `Bearer ${localStorage.getItem("token")}`,
  };
useEffect(() => {
  const fetch= async()=>{
    const response= await axios.get(`${BACKEND_URL}/get-favourite-book`, 
      {headers}
    );
    setFavouriteBooks(response.data.data);
  };
  fetch();
}, [FavouriteBooks]);

  
  return (
    <>
     {FavouriteBooks && FavouriteBooks.length === 0 && (
      <div className='text-3xl font-semibold h-[100vh] text-zinc-500 flex items-center justify-center flex-col w-full '>
        No Favourite Books
        <img src="./star.png" alt="star" className="h-[10vh] my-8" />
        </div>
        )}
     
     <div className='grid grid-cols-3 gap-4'>
     {FavouriteBooks && FavouriteBooks.map((items,i)=>(
      <div key={i}>
      <BookCard data= {items} favourites={true}/>
      </div>
    ))}
    </div>
     </>
  
   
  )
}

export default Favourites

