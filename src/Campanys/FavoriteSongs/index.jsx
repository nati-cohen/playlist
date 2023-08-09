import React, { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import styles from "./style.module.css";
import SongPlay from '../SongPlay';
import SongNowContext from '../../Context/SongNowContext';
import SongCard from '../SongCard';


function FavoriteSongs() {
  const [favoriteSongs, setFavoriteSongs] = useState([]);
  const {songNow , setSongNow} = useContext(SongNowContext)

 

  useEffect(() => {
    fetchFavoriteSongs();
  }, [favoriteSongs]);

  async function fetchFavoriteSongs() {
    const token = localStorage.getItem("token");
  
    if (!token) {
      console.log("User not logged in.");
      return;
    }
  
    try {
      const response = await axios.get(
        "http://localhost:5001/api/favorite/favoritesongs",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFavoriteSongs(response.data.favoriteSongs);
     
    } catch (error) {
      console.log("Error fetching favorite songs:", error);
    }
  }

  return (<>
    <div className={styles.songsContinuer}>
      {Array.isArray(favoriteSongs) && favoriteSongs.map((song) => <SongCard song={song} key={song.thumbnail.id} isFavorite={true}/>)}
    </div>
    <div>
    {songNow && (
        <SongPlay
          videoId={songNow}
          songs ={favoriteSongs}
        />)}
        </div>
     
    </>
  );
}

export default FavoriteSongs;
