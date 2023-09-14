import React, { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import {getAuth, RecaptchaVerifier, signInWithPhoneNumber} from 'firebase/auth'
import app from '../firebase/firebase'
import swal from "sweetalert";
import { addDoc } from "firebase/firestore";
import { usersRef } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import bcrypt from 'bcryptjs';
const auth = getAuth(app);

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [OTP, setOTP] = useState("");

  const generateRecaptha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth,'recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
      }
    }, auth);
  }

  const requestOtp = () => {
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
      generateRecaptha();
      let appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, `+91${form.mobile}`, appVerifier)
        .then(confirmationResult => {
          window.confirmationResult = confirmationResult;
          swal({
            text: "OTP Sent",
            icon: "success",
            buttons: false,
            timer: 3000,
          });
          setOtpSent(true);
          setLoading(false);
        }).catch((error) => {
          console.log(error)
        })
  }

  const verifyOTP = () => {
    try {
      setLoading(true);
      window.confirmationResult.confirm(OTP).then((result) => {
        uploadData();
        swal({
          text: "Sucessfully Registered",
          icon: "success",
          buttons: false,
          timer: 3000,
        });
        navigate('/login')
        setLoading(false); 
      })
    } catch (error) {
      console.log(error);
    }
  }

  const uploadData = async () => {
    try {
      const salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(form.password, salt);
      await addDoc(usersRef, {
        name: form.name,
        password: hash,
        mobile: form.mobile
      });
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div className=' flex flex-col justify-center items-center mt-4'>
    { otpSent ? 
    <>
        <p  className=' text-5xl text-red-600 font-bold'>Welcome to FilmyDuniya</p>
        <div className="relative mt-16">
          <label htmlFor="movieName" className="leading-7 text-lg font-bold ">Enter Verified OTP</label>
          <input  id="movieName" name="movieName" value={OTP} onChange={(e) => setOTP(e.target.value)} className="appearance-none w-full mt-1 bg-black border-b border-gray-400 rounded-sm text-base outline-none px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        <div className="p-2 w-full mt-4 mb-6">
          <button onClick={verifyOTP}  className="flex  mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg"> {loading ? <TailSpin height={25} color='white' /> : 'Confirm OTP'} </button>
        </div> 

    </>
    :
    <>  
      <h1 className=' text-2xl font-bold' >Sign Up!</h1>
      <p  className=' text-gray-500 mt-2'>Welcome to FilmyDuniya</p>
      
        <div className=' mt-3'>
            <div className="relative ">
              <label htmlFor="name" className=" leading-7 text-lg ">Full Name </label>
              <input type="text" id="name" name="name" value={form.name} onChange={(e) => setForm({...form, name:e.target.value})} className="w-full mt-1  bg-black border-b border-gray-400 rounded-sm text-base outline-none px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <div className="relative">
              <label htmlFor="movieName" className="leading-7 text-lg ">Mobile No </label>
              <input type="number" id="movieName" name="movieName" value={form.mobile} onChange={(e) => setForm({...form, mobile:e.target.value})} className="w-full mt-1 bg-black border-b border-gray-400 rounded-sm text-base outline-none px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            
            <div className="relative ">
              <label htmlFor="name" className=" leading-7 text-lg ">Password </label>
              <input type={'password'} id="name" name="name" value={form.password} onChange={(e) => setForm({...form, password:e.target.value})} className="w-full mt-1 bg-black border-b border-gray-400 rounded-sm text-base outline-none px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <div className="p-2 w-full mt-5">
              <button onClick={requestOtp}  className="flex  mx-auto text-white bg-green-500 border-0 py-2 px-3 focus:outline-none hover:bg-green-600 rounded text-lg"> {loading ? <TailSpin height={25} color='white' /> : 'Request OTP'} </button>
            </div>  
        </div>
      </>
    }  

      <p className='text-lg font-bold mt-4'> FilmyDuniya User ?<Link to={'/login'}> <span className=' text-red-500 text-lg cursor-pointer'>Login here!</span> </Link></p>
      
    <div id='recaptcha-container'></div>
    </div>
  )
}

export default Signup