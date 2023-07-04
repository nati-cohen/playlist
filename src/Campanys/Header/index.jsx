import React from 'react'
import styles from "./style.module.css";
import SearchInput from '../Searchinput';
// import { BiUserCircle } from "react-icons/bi";

function Header() {
  return (
    <header className={styles.header} >
      <img src="src/poto/logo1.png" alt="" className={styles.logo} />
      <SearchInput/>
{/* <BiUserCircle className={styles.user}/> */}
      </header>
  )
}

export default Header