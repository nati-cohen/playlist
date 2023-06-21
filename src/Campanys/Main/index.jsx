import React, { useState } from 'react'
import style from "./style.module.css";

import Home from '../../page/Home';


function Main() {
  const [isOn, setIsOn] = useState(false)


  return (
    <main>
   <Home/>
    </main>
  )
}


export default Main

// res.data.results.title
