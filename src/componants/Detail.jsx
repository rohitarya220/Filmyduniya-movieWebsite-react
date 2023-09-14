import React, { useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { useParams } from 'react-router-dom'
import { db } from '../firebase/firebase'
import { getDoc, doc } from 'firebase/firestore'
import { ThreeCircles } from 'react-loader-spinner'
import Review from './Review'

const Detail = () => {
    const { id } = useParams()
    const [data, setData] = useState({
        title: '',
        year: '',
        image: '',
        description: '',
        rating: 0,
        rated: 0
    })
    const [loading, setLoading] = useState(true);

  
    useEffect(() => {
        async function getData() {
            try {
                const _doc = doc(db, 'movies', id);
                const _data = await getDoc(_doc);
                setData(_data.data());
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false); 
            }
        }
        getData();
    }, [id]);


    return (
        <div className=' p-4 mt-4 flex flex-col md:flex-row items-center md:items-start w-full justify-center'>
            {loading ? <div className=' h-96 flex justify-center items-center '> <ThreeCircles height={50} /> </div> :
                <>
                    <img className=' shadow  md:sticky top-24 rounded-md h-[22rem] w-[17rem]' src={data.image} />
                    <div className=' md:ml-12 w-full mt-4 md:mt-0 md:w-1/2'>
                        <h1 className='text-3xl font-bold text-gray-400 '> {data.title}<span className=' text-xl font-bold text-white'>({data.year})</span></h1>

                        <div className=' flex items-center'>   
                        <ReactStars
                            size={30}
                            half={true}
                            value={data.rating / data.rated}
                            edit={false}
                        /> 
                        <span className=' ml-2 font-bold  text-lg'> ({ data.rated})</span>
                        </div>
                      

                        <p>{data.description} </p>

                        
                        <Review id={id} preRating={data.rating} userRated={data.rated} />
                    </div>
                </>
            }
        </div>
    )
}

export default Detail