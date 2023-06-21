import React from 'react'
import styles from "./style.module.css";
import SearchInput from '../Searchinput';


function Header() {
  return (
    <header className={styles.header} >
      <img src="src/poto/logo1.png" alt="" className={styles.logo} />
      <SearchInput/>

      </header>
  )
}

export default Header