import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Appstate } from '../App';


const Header = () => {
  const useAppstate = useContext(Appstate)

  return (
    <div className=' header sticky z-10 top-0 text-3xl flex justify-between items-center text-red-400 font-bold p-3 border-b-2 border-gray-500'>
      <Link to={'/'}> <span className='cursor-pointer'> Filmy<span className=' text-white'>World</span> </span></Link>
      { useAppstate.login? 
        <Link to={'/addmovie'}>
        <h1 className=' text-xl cursor-pointer flex items-center '>
          <Button variant="outlined">
            <AddIcon className=' mr-1' color='error' /><span className='  text-white'>Add New</span>
          </Button>
        </h1>
      </Link>
      :
      <Link to={'/login'}>
        <h1 className=' text-lg cursor-pointer capitalize flex items-center '>
          <button  className='text-white font-medium text-center bg-green-500 rounded-md  p-1'>Login</button>
        </h1>
      </Link>
      }
    </div>
  )
}

export default Header