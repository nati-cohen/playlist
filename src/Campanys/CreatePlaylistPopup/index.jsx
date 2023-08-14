import React, { useState } from 'react';
import styles from "./style.module.css";
import axios from 'axios';
import { AiFillCloseCircle } from "react-icons/ai";


function CreatePlaylistPopup({ onClose, onSave , playlists,song }) {
  const [playlistName, setPlaylistName] = useState('');

  const handleSave = () => {
    onSave(playlistName);
    onClose();
  };


  const addSongPlaylist = async (song, playlistId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("User not logged in");
      return;
    }
    
    try {
      await axios.post(
        "http://localhost:5001/api/playlist/addsong",
        { song,  playlistId },
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
  return (
    <div className={styles.createPlaylistPopup}> 
    <AiFillCloseCircle onClick={onClose}/>
    <h3>Existing playlists:</h3>
          <ul>
          {playlists?.map((playlist) => (
            <li
              key={playlist._id}
              onClick={()=>addSongPlaylist(song, playlist._id )}
            >

              {playlist.name}
            </li>
          ))}
        </ul>

      <h3>Create Playlist</h3>
      <input
        type="text"
        value={playlistName}
        onChange={(e) => setPlaylistName(e.target.value)}
        placeholder="Playlist name"
        className={styles.input} 
      />
      <button onClick={handleSave} className={styles.button}>Create</button>
    </div>
  );
}

export default CreatePlaylistPopup;
