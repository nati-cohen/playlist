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



function Leyaot() {
  const [search, setSearch] = useState('')




  return (
    <div className={styles.Leyaot}>
      <DataContext.Provider value={{ search, setSearch }}>
        <Header />
        {/* <Main /> */}
        <Navbar />

        <Routes>
          {/* <Route index element={<Main/>}/> */}
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/LikeSongs" element={<LikeSongs />} />
          <Route path="/Playlists" element={<Playlists />} />
          {/* <Route path="/login" element={<Login />} />
          <Route path="*" element={<Error />} /> */}
        </Routes>
      </DataContext.Provider>
    </div>
  )
}


export default Leyaot