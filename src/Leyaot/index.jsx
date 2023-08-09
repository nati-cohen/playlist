import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../page/Home'
import LikeSongs from '../page/LikeSongs'
import Playlists from '../page/Playlists'
import Header from '../Campanys/Header'
import Navbar from '../Campanys/Navbar'
import Main from '../Campanys/Main'
import styles from "./style.module.css";
import DataContext from '../Context/DataContext'
import SongContext from '../Context/SongContext'
import SongNowContext from '../Context/SongNowContext'
import Login from '../page/Login'
import Registration from '../page/Register'
import FavoriteSongs from '../Campanys/FavoriteSongs'
// import MassageContext from '../Context/MassageContext'


function Leyaot() {
  const [songlist, setSongList] = useState([])
  const [songNow, setSongNow] = useState()  
  const [search, setSearch] = useState('')
  // const [Massage, setMassage] = useState(false)




  return (
    <div className={styles.Leyaot}>
      {/* <MassageContext.Provider value={{ Massage, setMassage }}> */}
        <SongNowContext.Provider value={{ songNow, setSongNow }} >
          <SongContext.Provider value={{ songlist, setSongList }}>
            <DataContext.Provider value={{ search, setSearch }}>
              <Header />
              {/* <Main /> */}
              <Navbar />

              <Routes>
                {/* <Route index element={<Main/>}/> */}
                <Route path="/" element={<Home />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/LikeSongs" element={<LikeSongs />} />
                {/* <Route path="/LikeSongs" element={<FavoriteSongs />} /> */}
                <Route path="/Playlists" element={<Playlists />} />
                <Route path="/login" element={<Login />} />
                <Route path="/Register" element={<Registration />} />
                {/* <Route path="*" element={<Error />} />  */}
              </Routes>
            </DataContext.Provider>
          </SongContext.Provider>
        </SongNowContext.Provider>
      {/* </MassageContext.Provider> */}
    </div>
  )
}


export default Leyaot