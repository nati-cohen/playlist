import React, { useEffect, useRef, useState } from "react";
import styles from "./style.module.css";
import {
  TfiControlBackward,
  TfiControlForward,
  TfiControlPause,
  TfiControlPlay,
  TfiControlSkipBackward,
  TfiControlSkipForward,
  TfiControlShuffle,
} from "react-icons/tfi";
import YouTube from "react-youtube";
import { BiVolumeFull, BiVolumeMute, BiMinusCircle ,BiPlusCircle } from "react-icons/bi";
import { LuScreenShare} from "react-icons/lu";
 
function SongPlay({ videoId }) {
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);  //useState(false);
  const [isPresented, setIsPresented] = useState(false);

  const opts = {
    height: "160",
    width: "252",
    playerVars: {
      autoplay: 1,
      controls: 0,
      iv_load_policy: 3,
      modestbranding: 1,
      fs: 1,
      origin: window.location.origin,
    },
  };

  const handlePlay = () => {
    setIsPlaying(true);
  //   console.log(isPlaying)
  // console.log(playerRef.current);
    // if (playerRef.current && playerRef.current.internalPlayer) {
      // playerRef.current.playVideo();
      // }
  };

  
  const handlePause = () => {
    setIsPlaying(false);
    // console.log(isPlaying)
    // console.log(playerRef.current);
    // if (playerRef.current && playerRef.current.internalPlayer) {
      // playerRef.current.pauseVideo();
      // }
    };
    
    // useEffect(() => {
    //   setIsPlaying(true)
    // },[videoId])


  useEffect(() => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
      }
    }
  }, [isPlaying]);

  
  


  const Presented = () => {
    if (isPresented) {
      setIsPresented(false);
    } else {
      setIsPresented(true);
    }
  };

  //שליטה על השתקת / הפעלת השמע
  const [player, setPlayer] = useState(null);
  const [isMuted, setIsMuted] = useState(false);

  const onPlayerReady = (event) => {
    setPlayer(event.target);
    playerRef.current = event.target

  };

  const muteVolume = () => {
    setIsMuted(true)
    if (player) {
      player.mute();
    }
  };

  const unmuteVolume = () => {
    setIsMuted(false)
    if (player) {
      player.unMute();
    }
  };

//שליטה בעוצמת השמע
const [volume, setVolume] = useState(50)
const increaseVolume = () => {
  if (player && volume < 100) {
    const newVolume = volume + 10;
    player.setVolume(newVolume);
    setVolume(newVolume);
  }
};

const decreaseVolume = () => {
  if (player && volume > 0) {
    const newVolume = volume - 10;
    player.setVolume(newVolume);
    setVolume(newVolume);
  }
};


  return (
    <>
      <div className={styles.box}>
        <div className={styles.button}>
          <div className={styles.volume}>
          <BiPlusCircle onClick={increaseVolume}/>
          {isMuted ? (
            < BiVolumeMute onClick={unmuteVolume} />
          ) : (
            <BiVolumeFull onClick={muteVolume} />
          )}
          <BiMinusCircle onClick={decreaseVolume}/>
          </div>
           <div className={styles.play}>
          <TfiControlBackward />
          <TfiControlSkipBackward />
          
          {isPlaying ? (
            <TfiControlPause onClick={handlePause}    />
            ) : (
              <TfiControlPlay onClick={handlePlay} />
              )}
          <TfiControlSkipForward />
          <TfiControlForward />
          <TfiControlShuffle />
          </div>
              <LuScreenShare onClick={Presented} />
        </div>
      </div>
     
      <div
        className={styles.video}
        style={{ display: isPresented ? "block" : "none" }}
        // className={ isPresented ? styles.video : styles.video1 }
      >
        {/* {isPlaying && (
          )} */}
          <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady}/>
          {/* <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} onPlay={handlePlay} onPause={handlePause}/>
           <YouTube videoId={videoId} opts={opts} onEnd={() => setIsPlaying(false)} /> */}
      </div>
    </>
  );
}

export default SongPlay;

// import React, { useEffect, useRef, useState } from 'react';
// import styles from "./style.module.css";
// import { TfiControlBackward ,TfiControlForward, TfiControlPause, TfiControlPlay, TfiControlSkipBackward, TfiControlSkipForward, TfiControlShuffle } from "react-icons/tfi";
// import YouTube from 'react-youtube';
// import { BiFullscreen } from "react-icons/bi";

// function SongPlay({ videoId, onStop }) {
//   const playerRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(true);
//   const [isPresented, setIsPresented] = useState(false)
// //  const [video, setvideo] = useState(videoId)

//   const handlePlay = () => {
//     setIsPlaying(true);
//   };

//   const handlePause = () => {
//     setIsPlaying(false);
//     if (playerRef.current && playerRef.current.internalPlayer) {
//       playerRef.current.internalPlayer.pauseVideo();
//     }
//   };

//   useEffect(() => {
//     if (playerRef.current) {
//       if (isPlaying) {
//         playerRef.current.playVideo();
//       } else {
//         playerRef.current.pauseVideo();
//       }
//     }
//   }, [isPlaying]);

//   // useEffect(() => {
//   //   return () => {
//   //     onStop(); // Call the onStop function when the component is unmounted or when a new song is played
//   //   };
//   // }, [onStop]);

//   // const onReady = (event) => {
//   //   playerRef.current = event.target; // Set the playerRef.current when the YouTube player is ready
//   // };

//   const Presented =()=>{
//     if(isPresented){
//       setIsPresented(false)
//     }
//     else{
//       setIsPresented(true)
//     }
//   }

//   return (
//     <>
//     <div className={styles.box}>
//       <div className={styles.button}>
//       <BiFullscreen  onClick={Presented}/>
//         <TfiControlBackward />
//         <TfiControlSkipBackward />
//         {isPlaying ? (
//           <TfiControlPause onClick={handlePause} />
//         ) : (
//           <TfiControlPlay onClick={handlePlay} />
//         )}
//         <TfiControlSkipForward />
//         <TfiControlForward />
//         <TfiControlShuffle />
//       </div>

//     </div>
//         <div className={styles.video} style={{display: isPresented ? 'block' : 'none' }}>

//        {isPlaying && (
//         <YouTube videoId={videoId} opts={opts} onEnd={() => setIsPlaying(false)} />
//       )}
//       </div>
//     </>
//   );
// }

// export default SongPlay;

// const opts = {
//   height: '160',
//   width: '252',
//   playerVars: {
//     autoplay: 1,
//     controls:0,
//     iv_load_policy:3,
//     modestbranding:1,
//     fs:1,
//   },
// };

// import React from 'react'
// import styles from "./style.module.css";
// import { TfiControlBackward, TfiControlForward, TfiControlPause, TfiControlPlay, TfiControlSkipBackward, TfiControlSkipForward, TfiControlShuffle  } from "react-icons/tfi";
// import { YouTube } from 'you-tube';

// function SongPlay({id}) {

//   // const play = (id) => {
//   //   return <YouTube videoId='5IEMM0Mhsms'/>

//   // }

//   return (
//     <div className={styles.box}>
//         <div className={styles.button}>
//         <TfiControlBackward/>
//         <TfiControlSkipBackward/>
//         <TfiControlPlay/> <TfiControlPause/>
//         <TfiControlSkipForward/>
//         <TfiControlForward/>
//         <TfiControlShuffle/>

//         </div>
//     </div>

//   )
// }

// export default SongPlay