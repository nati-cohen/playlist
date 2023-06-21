import React from 'react'
import { Link } from 'react-router-dom'
import styles from "./style.module.css";



function Navbar() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.Navbarlist}>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/playlists">Playlists</Link>
        </li>
        <li>
          <Link to="/likesongs">likesongs</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar