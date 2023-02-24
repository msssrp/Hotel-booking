import React,{useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function CheckUser() {

  const navigate = useNavigate()

  useEffect(() => {

    if(!document.cookie){
      return navigate('/')
    }

    const token = document.cookie.split(';').find(c => c.trim().startsWith('token=')).split('=')[1];
  
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
    axios.post('http://localhost:5000/auth',token)
      .then(res => {
        if (res.data.status === 'success' && res.data.role === 'admin') {
          localStorage.setItem('u_id',res.data.decode.id)
          navigate('/dashboard');
        } else{
          localStorage.setItem('u_id',res.data.decode.id)
          navigate('/')
        }
      })
      .catch(error => {
        console.log(error);
        navigate('/');
      });
  }, []);



  return (
    <div>CheckUser</div>
  )
}

export default CheckUser