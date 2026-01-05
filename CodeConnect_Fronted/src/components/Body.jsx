import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import BASE_URL from '../utils/constant'
import axios from 'axios'
import { addUser } from '../utils/userSlice'
import Feed from './Feed'
const Body = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate()
  const userData=useSelector((store)=>store.user)
  const fetchUser=async ()=>{
    if(userData){
      return
    }
    try{
      const res=await axios.get(BASE_URL+"/profile/view",{
        withCredentials:true,
      })
      dispatch(addUser(res.data))
    }
    catch(err){
      if(err.status===401){
        navigate('/signup')
      }
      // navigate("/login")
      console.log(err);
    }
  }
  useEffect(()=>{
    
    fetchUser()

    
  },[])
  return (
    <div>
        <Navbar/>
    
        <Outlet/>
    </div>
  )
}

export default Body