import React, { useEffect, useState } from 'react'
import axios  from 'axios'
import BookCard from '../BookCard/BookCard'


const Favourites = () => {
  const [fav,setFav] = useState();
  const headers={
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")} `,
    
  }
  useEffect(()=>{
    const fetch=async ()=>{
      const res=await axios.get("http://localhost:1000/api/v1/get-favourite-books",
        {headers}
      )
      setFav(res.data.data)
    }
    fetch()
  },[fav])
  return (
    <>
      {fav && fav.length===0 &&
         <div className='text-3xl font-semibold h-screen text-zinc-500 flex flex-col items-center justify-center w-full'>
            No Favourite Books...
          </div>}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
        {fav && fav.map((items,i)=>(
          <div key={i}>
            <BookCard data={items} favourite={true} />
          </div>
        ))}
      </div>
    </>
  )
}

export default Favourites
