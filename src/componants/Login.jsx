import React, { useContext, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import {query, where, getDocs} from 'firebase/firestore'
import { usersRef } from "../firebase/firebase";
import { Appstate } from "../App";
import bcrypt from 'bcryptjs'
import swal from "sweetalert";

const Login = () => {
  const navigate = useNavigate();
  const useAppstate = useContext(Appstate);
  const [form, setForm] = useState({
    mobile: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!form.mobile || !form.password ) {
        swal({
          title: 'All fields are required',
          icon: 'error',
          button: false,
          timer: 3000,
        });
        return;
      }
    setLoading(true);
    try {
      const quer = query(usersRef, where('mobile', '==', form.mobile))
      const querySnapshot = await getDocs(quer);
      querySnapshot.forEach((doc) => {
        const _data = doc.data();
        const isUser = bcrypt.compareSync(form.password, _data.password);
        if(isUser) {
          useAppstate.setLogin(true);
          useAppstate.setUserName(_data.name);
         
          swal({
            title: "Logged In",
            icon: "success",
            buttons: false,
            timer: 3000
          })
          
          navigate('/')
        } else {
          swal({
            title: "Invalid Credentials",
            icon: "error",
            buttons: false,
            timer: 3000
          })
        }
      })
    } catch (error) {
      swal({
        title: error.message,
        icon: "error",
        buttons: false,
        timer: 3000
      })
    }
    setLoading(false);
  }

  return (
    <div className=' flex flex-col justify-center items-center mt-4'>
      <h1 className=' text-2xl font-bold' >Log in!</h1>
      <p  className=' text-gray-500 mt-2'>Welcome to FilmyDuniya</p>
      <div className=' mt-9'>
          <div className="relative">
            <label htmlFor="movieName" className="leading-7 text-lg ">Mobile No :</label>
            <input type="number" id="movieName" name="movieName" value={form.mobile} onChange={(e) => setForm({...form, mobile:e.target.value})} className="w-full mt-2 bg-gray-100  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700  px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <div className="relative mt-4">
            <label htmlFor="name" className=" leading-7 text-lg ">Password :</label>
            <input type="password" id="name" name="name" value={form.password} onChange={(e) => setForm({...form, password:e.target.value})} className="w-full mt-2 bg-gray-100  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700  px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <div className="p-2 w-full mt-5">
                <button onClick={login} className="flex  mx-auto text-white bg-green-700 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg"> {loading ? <TailSpin height={25} color='white' /> : 'Login'} </button>
          </div>
      </div>

      <p className='text-lg font-bold mt-8'> New User ?<Link to={'/signup'}> <span className=' text-red-500 text-lg cursor-pointer'>Register here!</span> </Link></p>
      

    </div>
  )
}

export default Login