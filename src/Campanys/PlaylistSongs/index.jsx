import React, { useContext, useEffect, useState } from 'react'
import styles from "./style.module.css";
import axios from 'axios';
import SongCard from '../SongCard';
import SongNowContext from '../../Context/SongNowContext';
import SongPlay from '../SongPlay';
import { CgTrash } from "react-icons/cg";

export default function PlaylistSongs() {
  const [playlists, setPlaylists] = useState([]);
  const [playlistSongs, setPlaylistSongs] = useState([]);
  const { songNow, setSongNow } = useContext(SongNowContext)
  const [currentPlaylistId, setCurrentPlaylistId] = useState(null);
  

  useEffect(() => {
    loadPlaylists();
  }, []);



  const loadPlaylists = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('User not logged in');
      return;
    }

    try {
      const response = await axios.get('http://localhost:5001/api/playlist/userplaylists', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPlaylists(response.data.playlistSongs);
    } catch (error) {
      console.log('Error loading playlists:', error);
    }
  };


  const SongPlaylists = async (playlistId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('User not logged in');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5001/api/playlist/songplaylist',
        { playlistId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      setPlaylistSongs(response.data.playlistSongs);
      setCurrentPlaylistId(playlistId);
    } catch (error) {
      console.log('Error loading playlists:', error);
    }
  };

  const removePlaylist = async (playlistId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("User not logged in.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5001/api/playlist/removeplaylist",
        {playlistId},
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

  return (
    <div className={styles.plalistContinuer}>
      <div className={styles.playlistItems}>
        {playlists?.map((playlist) => (
          <div
            key={playlist._id}
            className={styles.playlistItem}
            onClick={() => SongPlaylists(playlist._id)}>
              <CgTrash
              onClick={()=>removePlaylist(playlist._id)}
              className={styles.remove}
              />
            {playlist.name}
          </div>
        ))}
      </div>

      <div className={styles.songsContinuer}>
        {playlistSongs?.map((song) => (
          <SongCard
            key={song.thumbnail.id}
            song={song}
            isPlaylist={false}
            playlistId={currentPlaylistId} 
          />
        ))}

      </div>
      <div>
        {songNow && (
          <SongPlay
            videoId={songNow}
            songs={playlistSongs}
          />)}
      </div>
    </div>
  )
}
