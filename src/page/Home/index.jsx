import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SongCard from '../../Campanys/SongCard'
import SearchResult from '../../Campanys/SearchResult'
import SongContext from '../../Context/SongContext'
import SongNowContext from '../../Context/SongNowContext'  ////////



function Home() {
  const [songlist, setSongList] = useState([])
  const [songNow, setSongNow] = useState()  //////////
 

  return (
    <div>
      
     ` <SongNowContext.Provider value={{songNow, setSongNow}} >`       
      <SongContext.Provider value={{ songlist, setSongList }}>
        <SearchResult />
      </SongContext.Provider>
      </SongNowContext.Provider>
     
    </div>
  )
}

export default Home