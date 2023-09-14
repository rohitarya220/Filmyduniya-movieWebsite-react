import React, { useContext, useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import {  reviewsRef, db } from '../firebase/firebase'
import { addDoc, doc, updateDoc, query, where, getDocs } from 'firebase/firestore'
import { TailSpin, ThreeDots } from 'react-loader-spinner'
import swal from 'sweetalert'
import { Appstate } from '../App'
import { useNavigate } from 'react-router-dom'

const Review = ({id, preRating, userRated}) => {
    
    const useAppState = useContext(Appstate)
    const navigate = useNavigate()
    const [rating, setRating] =useState(0)
    const [loading, setLoading] =useState(false)
    const [reviewsLoading, setReviewsLoading] = useState(false)
    const [form, setForm] = useState('')
    const [data, setData] = useState([])
    const [newAdded, setNewAdded] = useState(0)


    const sendReview = async () =>{
      if (!form.trim() || rating === 0 ) {
        swal({
          title: 'All fields are required',
          icon: 'error',
          button: false,
          timer: 3000,
        });
        return;
      }
      setLoading(true)
      try {
        if(useAppState.login){ 
          await addDoc(reviewsRef, {
            movieid: id,
            name: useAppState.userName ,
            rating: rating,
            thought: form,
            timestamp: new Date().getTime()
          })
          const ref = doc(db, 'movies', id)
          await updateDoc(ref, {
            rating: preRating + rating,
            rated: userRated + 1
          })
            setRating(0)
            setForm('')
            setNewAdded(newAdded + 1)
          swal({
            title: 'Review sent',
            icon: 'success',
            button: false,
            timer: 2000
          })}else{
            navigate('/login')
          }
      } catch (error) {
        swal({
          title: error.message,
          icon: 'error',
          button: false,
          timer: 2000
        })
      }

      setLoading(false)


    }
      useEffect (() =>{
        async function getData(){
          setReviewsLoading(true)
          setData([])
          let quer = query(reviewsRef, where('movieid', '==', id))
          const querySnapshot = await getDocs(quer)

          querySnapshot.forEach((doc) =>{
            setData((prev) => [...prev, doc.data()])
          },[])

          setReviewsLoading(false)

        }
        getData()
      },[newAdded])
    

  return (
    <div className=' mt-9 w-full'>
       
      <h1  className=' text-2xl md:text-3xl font-bold ml- md:ml-10 '> Share your Thoughts here...</h1>
        <ReactStars
              className=' ml-24 md:ml-10 p-2'
              size={30}
              half={true}
              onChange={(rate) => setRating(rate)}
              value={rating}
            />
            
        <input 
          value={form}
          onChange={(e) => setForm(e.target.value)}
          placeholder='Your comment...'
          className='flex items-center m-auto header rounded-md w-full md:w-[85%] p-2 outline-none '
        />
        <button onClick={sendReview} className=' flex items-center text-lg font-bold rounded-md shadow-lg  bg-green-500 px-9 m-auto py-2 mt-4'>
         { loading? <TailSpin height={10} color='white' /> : 'Share'}
          </button>
        {
          reviewsLoading ? <div className=' flex justify-center mt-8'> <ThreeDots height={15} color='white' /></div> : 
          <div className=' mt-8 '>
            {
              data.map((e,i) =>{
                return(
                  <div className=' bg-neutral-950-900 mt-2 w-full p-2 rounded-lg border-b border-gray-600' key={i}>
                   <div className='flex items-center'>
                    <h1 className=' text-lg font-bold text-blue-600'>{e.name}</h1>
                    <p className=' ml-3 text-sm'>{new Date(e.timestamp).toLocaleString()}</p>
                   </div>
                   <ReactStars
                    className=' '
                    size={15}
                    half={true}
                    edit={false}
                    value={e.rating}
                  />
                   <p className=' ml-2 '>{e.thought}</p>
                   
                  </div>
                )
              })
            }
          </div>
        }
      

        <div className=' h-96'></div>

    </div>
  )

}

export default Review