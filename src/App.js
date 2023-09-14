import Header from './componants/Header'
import Card from './componants/Card';
import AddMovies from './componants/AddMovies';
import { Route, Routes } from 'react-router-dom';
import Detail from './componants/Detail';
import { createContext, useState } from 'react';
import Login from './componants/Login'
import Signup from './componants/Signup'

const Appstate = createContext();


function App() {
  const [login, setLogin] = useState(false);
  const [ userName, setUserName] = useState('');

  return (
    <Appstate.Provider value={{login, userName, setLogin, setUserName}}> 
      <div className="App relative">
          <Header />
          <Routes>
            <Route path='/' element={<Card />} />
            <Route path='/addmovie' element={<AddMovies />} />
            <Route path='/detail/:id' element={<Detail />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </Routes>
      </div>
    </Appstate.Provider>
  );
}

export default App;
export {Appstate}