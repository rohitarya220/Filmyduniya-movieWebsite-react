import React, {useContext, useState} from 'react'
import { TailSpin } from 'react-loader-spinner';
import { addDoc} from 'firebase/firestore'
import { moviesRef } from '../firebase/firebase'
import swal from 'sweetalert';
import { Appstate } from '../App'
import { useNavigate } from 'react-router-dom';




const AddMovies = () => {
  const useAppState = useContext(Appstate);
  const navigate = useNavigate()

  const [form, setForm] = useState({
    title:"",
    year: "",
    description: "",
    image: "",
    rated: 0,
    rating: 0
  });
  const [loading, setLoading] = useState(false);

  const addMovies = async () => {
    if(!form.title || !form.year || !form.image || !form.description) {
      swal({
        title: 'All fields are required',
        icon: 'error',
        button: false,
        timer: 2000,
      });
      return;
    }
      setLoading(true)
      if(useAppState.login){  
      await addDoc(moviesRef, form)
      swal({
        title: 'Successfully Added',
        icon: 'success',
        button: false,
        timer: 2000
      })
      setForm({
        title: '',
        year: '',
        image: '',
        description: ''
    })}else{
      navigate('/login')
    }
    setLoading(false)
    
  }




  return (
    <div>
      <section className=" body-font relative m-5">
        <div className="container  py-8 mx-auto">
          <div className="flex flex-col text-center w-full mb-4">
            <h1 className="sm:text-3xl text-2xl font-bold title-font text-red-600 ">Add Movie</h1>
          </div>

          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="name" className="leading-7 text-lg ">Title of Movie</label>
                  <input type="text" id="name" name="name"value={form.title} onChange={(e) => setForm({...form, title:e.target.value})} className="w-full bg-gray-100  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="year" className="leading-7 text-lg  ">Year of release</label>
                  <input type="year" id="year" name="year" value={form.year} onChange={(e) => setForm({...form, year:e.target.value})} className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
               
              </div>

              <div className="p-2 w-full">
                <div className="relative">
                  <label htmlFor="message" className="leading-7 text-lg ">Image Link</label>
                  <input id="message" name="message" value={form.image} onChange={(e) => setForm({...form, image:e.target.value})} className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>

              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label htmlFor="message" className="leading-7 text-lg ">Description</label>
                  <textarea id="message" name="message" value={form.description} onChange={(e) => setForm({...form, description:e.target.value})} className="w-full bg-gray-100  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                </div>
              </div>

              <div className="p-2 w-full">
                <button onClick={addMovies} className="flex mx-auto text-white bg-green-700 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg"> {loading ? <TailSpin height={25} color='white' /> : 'Submit'} </button>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AddMovies