import React from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  return (
    <>
    
      <div
        className="min-h-screen"
        style={{
          backgroundImage:
            "url('1e45e996-742a-465d-9b64-8b3394976a8f-Photoroom.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Navbar />

        <div className=' flex flex-col items-center justify-center min-h-screen'>

        <div
          onClick={() => navigate("/Shop")}
          className="bg-transparent w-70 h-20 flex items-center justify-center cursor-pointer"
          >
          
        </div>
          </div>
      </div>
    </>
  )
}

export default Home
