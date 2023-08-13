import { useState, useContext, useEffect } from "react";
import styles from "./style.module.css";
import SongPlay from "../SongPlay";
import SongNowContext from "../../Context/SongNowContext";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { GrAddCircle } from "react-icons/gr";
import LikeContext from "../../Context/LikeContext";
import axios from "axios";
import CreatePlaylistPopup from "../CreatePlaylistPopup";


export default function SongCard({ song, isFavorite }) {
  const [currentSong, setCurrentSong] = useState(null);
  const { songNow, setSongNow } = useContext(SongNowContext);
  const [isLiked, setIsLiked] = useState(isFavorite);
  const { Likes, setLikes } = useContext(LikeContext);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // setIsLiked(isicon)
  const handlePlay = (song) => {
    setSongNow(song.thumbnail.id);
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };
  // const handleLikeClick = () => {
  //   setIsLiked((prevIsLiked) => !prevIsLiked);

  // };

  const addToFavorite = async (song) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("User not logged in.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5001/api/favorite/addsong",
        { song },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Song added to favorites successfully.");
    } catch (error) {
      console.log("Error adding song to favorites:", error);
    }
  };


  const removeFromFavorite = async (songId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("User not logged in.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5001/api/favorite/removesong",
        { songId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Song removed from favorites successfully.");
    } catch (error) {
      console.log("Error removing song from favorites:", error);
    }
  };


  const handleLikeClick = (song) => {
    // If the user is logged in (token exists), add the song to favorites
    if (!isLiked) {
      if (localStorage.getItem("token")) {
        addToFavorite(song);
      }
    }
    if (isLiked) {
      if (localStorage.getItem("token")) {
        removeFromFavorite(song);
      }
    }
    setIsLiked((prevIsLiked) => !prevIsLiked);

  };


  const addSongPlaylist = async (song, playlistName) => {
    console.log(playlistName);
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("User not logged in");
      return;
    }
    
    try {
      await axios.post(
        "http://localhost:5001/api/playlist/create",
        { song, playlistName }, // שלח גם את שם הפלייליסט
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Song added to playlist successfully.");
    } catch (error) {
      console.log("Error adding song to playlist:", error);
    }
  }
  


  // const handleLikeClick = (song) => {
  //   setIsLiked((prevIsLiked) => !prevIsLiked);

  //   const updatedLikes = isLiked
  //     ? Likes.filter((favSong) => favSong.id !== song.id)
  //     : [...Likes, song];

  //   setLikes(updatedLikes);
  //   console.log(Likes);
  // };

  // useEffect(() => {
  //   console.log(Likes);
  // }, [Likes]);

  // const hanleLike = (song) => {
  //   if(isLiked){
  //     setIsLiked(...isLiked , song)
  //   console.log(isLiked);
  //   }
  // }

  if (!song) return null;

  return (
    <>
      <div className={styles.songContainer}>
      <div>
          <div onClick={() => handleLikeClick(song)}>
            {isLiked ? (
              <AiFillHeart className={styles.like} />
            ) : (
              <AiOutlineHeart className={styles.like} />
            )}
          </div>
          <GrAddCircle className={styles.add} onClick={togglePopup} />
          {isPopupOpen && (
            <CreatePlaylistPopup
              onClose={togglePopup}
              onSave={(playlistName) => addSongPlaylist(song, playlistName)}
            />
          )}
        </div>
        <img
          src={song.thumbnail.url}
          alt="song image"
          className={styles.img}
          onClick={() => handlePlay(song)}
        />

        {/* <div onClick={handleLikeClick}>
    {isLiked ? (
      <AiFillHeart className={styles.like} onClick={(e) => e.stopPropagation()} />
    ) : (
      <AiOutlineHeart className={styles.like} onClick={(e) => e.stopPropagation()} />
    )}
  </div> */}

        <span className={styles.title}>{song.title}</span>
      </div>
    </>
  );
}





// import { useState } from "react";
// import styles from "./style.module.css";
// import SongPlay from "../SongPlay";

// export default function SongCard({ song }) {
//   const [currentSong, setCurrentSong] = useState(null);

//   const handlePlay = (song) => {
//     // if(currentSong!=null) {                          //אפשרות אחת לסדר את הבעיה של שמיעה כפןלה - למה לא עובד?????-?????-
//     //       handleStop()
//     //     }
//     setCurrentSong(song);
//   };

//   const handleStop = () => {
//     setCurrentSong(null);
//   };

//   // const handlePlay = () => {                                  //אפשרות 2 לסדר את הבעיה של שמיעה כפןלה - למה לא עובד?????-?????-
//   //   if (currentSong && currentSong === song) {

//   //     setCurrentSong(null);
//   //   } else {

//   //     setCurrentSong(song);

//   //   }
//   // };

//   if (!song) return null;

//   return (
//     <>
//       <div className={styles.songContainer} onClick={() => handlePlay(song)}>
//         <img src={song.thumbnail.url} alt="song image" className={styles.img}/>
//         <span className={styles.title}>{song.title}</span>
//       </div>
//       {currentSong && (
//         <SongPlay
//           videoId={currentSong.thumbnail.id}
//           // onStop={handleStop}
//         />
//       )}
//     </>
//   );
// }

// const [currentSong, setCurrentSong] = useState(null);

//   const handlePlay = () => {
//     if (currentSong && currentSong === song) {

//       setCurrentSong(null);
//     } else {

//       setCurrentSong(song);
//       setIsSongPlaying(true)
//     }
//   };

// import { useState } from "react";
// import styles from "./style.module.css";
// import SongPlay from "../SongPlay";

// export default function SongCard({ song }) {
//   const [currentSong, setCurrentSong] = useState(null);

//   const handlePlay = (song) => {
//     setCurrentSong(song);
//   };

//   const handleStop = () => {
//     setCurrentSong(null);
//   };

//   if (!song) return null;

//   return (
//     <>
//       <div className={styles.songContainer} onClick={() => handlePlay(song)}>
//         <img src={song.thumbnail.url} alt="song image" />
//         <span>{song.title}</span>
//       </div>
//       {currentSong && (
//         <SongPlay
//           videoId={currentSong.thumbnail.id}
//           onStop={handleStop}
//         />
//       )}
//     </>
//   );
// }

// import { useState } from "react";
// import styles from "./style.module.css";
// import SongPlay from "../SongPlay";

// export default function SongCard({ song }) {
//   const [isSoaw, setIsSoaw] = useState(false);

//   const handlPlay = () => {
//     setIsSoaw(true)
//   };

//   if (!song) return null;

//   return (
//     <>
//     <div className={styles.songContinuer} onClick={handlPlay}>
//       <img src={song.thumbnail.url} alt="song image" />
//       <span>{song.title}</span>

//     </div>
//     {isSoaw && <SongPlay id={song.thumbnail.id} />}
//     </>
//   );
// }

// import styles from "./style.module.css";
// import YouTube from "react-youtube";

// const SongCard = ({ song }) => {

// const videoId = song.thumbnail.id;

//   const playerOptions = {
//     height: "150",
//     width: "200",
//     playerVars: {
//       fs: 1,
//       loop: 1,
//       modestbranding: 1,
//       controls:0,
//       iv_load_policy: 3,
//       modestbranding: 1,
//       iv_load_policy:3
//     },
//   };

//   const handlePlayerReady = (event) => {
//     console.log("Player is ready:", event.target);
//   };

//   const handlePlayerStateChange = (event) => {
//     console.log("Player state has changed:", event.target.getPlayerState());
//   };

//   return (
//     <div>
//       <YouTube
//         videoId={videoId}
//         opts={playerOptions}
//         onReady={handlePlayerReady}
//         onStateChange={handlePlayerStateChange}
//       />
//     </div>
//   );
// };
// export default SongCard;
