
import { useEffect, useState } from 'react'
import {  ThreeDots } from 'react-loader-spinner';
import ReactStars from 'react-stars'
import {getDocs} from 'firebase/firestore'
import { moviesRef } from '../firebase/firebase';
import { Link } from 'react-router-dom';

const Card = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function getData() {
      setLoading(true)
      const _data = await getDocs(moviesRef)
      _data.forEach((doc) =>{
        setData((pre) => [...pre, {...(doc.data()),id:doc.id}])
      })
    

      setLoading(false)
    }
    getData()
  }, [])



  return (
    <div className=' flex flex-wrap justify-between p-3 mt-2'>

      {loading ? <div className=' w-full flex justify-center items-center h-96'><ThreeDots height={40} color='white' /></div> :   
         data.map((e, i) => {
     
       return ( 
         <Link to={`/detail/${e.id}`}> 
     
           <div key={i} className='card font-medium shadow-lg rounded-md p-1 m-2 hover:-translate-y-3 cursor-pointer mt-3 transition-all duration-500 '>
              <img className=' h-40 w-36 md:h-60 md:w-48  ' src={e.image} alt="" />
              <h1 className=' text-center md:text-lg '> <span className=' text-gray-500   '></span> {e.title}</h1>
              <h1 className='flex items-center '> <span className=' text-gray-500  mr-1'>Rating: </span><ReactStars
                size={20}
                half={true}
                value={e.rating / e.rated}
                edit={false}
              />
              </h1>
              <h1> <span className=' text-gray-500 mr-1 '>Year:  </span> {e.year} </h1>
          </div>
        </Link>

        )
      })
      }
   
    </div>
  )
}

export default Card