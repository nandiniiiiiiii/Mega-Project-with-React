import { useEffect, useState } from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import {Footer,Header} from './components/index';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => { setloading(false) })
  }, [])

  // console.log(process.env.REACT_APP_APPWRITE_URL);
  return !loading ? (
    <div className="container">
      <div className="content">
        <Header/>
        <main>
          {/* Todo:   outlet */}
          <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ) : null
}

export default App;
