import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styles from "./style.module.css";
import SongCard from "../SongCard";
import DataContext from "../../Context/DataContext";
import SongContext from "../../Context/SongContext";
import SongNowContext from "../../Context/SongNowContext";
import SongPlay from "../SongPlay";



export default function SearchResult() {
  const { search } = useContext(DataContext);
  const { setSongList } = useContext(SongContext);
  const {songNow , setSongNow} = useContext(SongNowContext)
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        url: "https://simple-youtube-search.p.rapidapi.com/search",
        params: {
          query: search || "חנן+בן+ארי",
          // query: search ,
          safesearch: "true",
        },
        headers: {
          "X-RapidAPI-Key":
            "3b317b781emsh2dea7c21f82bce1p18f339jsnb1ec4451ad2b",
          "X-RapidAPI-Host": "simple-youtube-search.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        setSongs(response.data.results || []);
        setSongList(response.data.results.map((song) => song.thumbnail.id));
      } catch (error) {
        console.error(error);
      }
    };
    

    fetchData();
  }, [search, setSongList]);

  return (
    <>
    <div className={styles.songsContinuer}>
      {Array.isArray(songs) && songs.map((song) => <SongCard song={song} key={song.thumbnail.id} isFavorite={false}/>)}
    </div>
    <div>
    {songNow && (
        <SongPlay
          videoId={songNow}
          songs ={songs}
        />)}
        </div>
     
    </>
    
  );
}













// import axios from "axios";
// import { useContext, useEffect, useState } from "react";
// import styles from "./style.module.css";
// import SongCard from "../SongCard";
// import DataContext from "../../Context/DataContext";
// import SongContext from "../../Context/SongContext";

// export default function SearchResult() {
//   const { search } = useContext(DataContext);
//   const { setSongList } = useContext(SongContext);
//   const [songs, setSongs] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const options = {
//         method: "GET",
//         url: "https://simple-youtube-search.p.rapidapi.com/search",
//         params: {
//           query: search || "ישי+ריבו",
//           // query: search ,
//           safesearch: "true",
//         },
//         headers: {
//           "X-RapidAPI-Key":
//             "3b317b781emsh2dea7c21f82bce1p18f339jsnb1ec4451ad2b",
//           "X-RapidAPI-Host": "simple-youtube-search.p.rapidapi.com",
//         },
//       };

//       try {
//         const response = await axios.request(options);
//         setSongs(response.data.results || []);
//         setSongList(response.data.results.map((song) => song.thumbnail.id));
//       } catch (error) {
//         console.error(error);
//       }
//     };
    

//     fetchData();
//   }, [search, setSongList]);

//   return (
//     <div className={styles.songsContinuer}>
//       {Array.isArray(songs) && songs.map((song) => <SongCard song={song} key={song.thumbnail.id}/>)}
//     </div>
//   );
// }
