import React, { useState } from 'react'
import './App.css'
import LikeContext from './Context/LikeContext'
import Leyaot from './Leyaot'



function App() {
 const [Likes, setLikes] = useState([])


  return (
    <div>
    
<LikeContext.Provider value={{Likes , setLikes }} >
      <Leyaot/>
      </LikeContext.Provider>
  
    </div>
  )
}

export default App
