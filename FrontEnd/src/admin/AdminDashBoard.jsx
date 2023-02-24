import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { Link , useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashBoardStat from './components/DashBoardStat';


function AdminDashBoard() {


  const navigate = useNavigate()


  useEffect(() => {

    if(!document.cookie){
      return navigate('/sign-in')
    }

  }, []);
  

  return (
    <>
      <DashBoardStat/>
    </>
  )
}

export default AdminDashBoard