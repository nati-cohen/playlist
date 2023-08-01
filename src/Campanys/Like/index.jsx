import React, { useContext } from 'react'
import styles from "./style.module.css";
import LikeContext from '../../Context/LikeContext';
import SongNowContext from '../../Context/SongNowContext';
import SongCard from '../SongCard';
import SongPlay from '../SongPlay';



function Like() {
  const { Likes, setLikes } = useContext(LikeContext);
  const { songNow, setSongNow } = useContext(SongNowContext)
  
  console.log(Likes, songNow);
  return (

    <>
      <div className={styles.songsContinuer}>
        {Array.isArray(Likes) && Likes.map((song) => <SongCard song={song} key={song.thumbnail.id} />)}
      </div>
      <div>
        {songNow && (
          <SongPlay
            videoId={songNow}
          />)}
      </div>

    </>

  )
}


export default Like


