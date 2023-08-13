import React, { useState } from 'react';
import styles from "./style.module.css";


function CreatePlaylistPopup({ onClose, onSave }) {
  const [playlistName, setPlaylistName] = useState('');

  const handleSave = () => {
    onSave(playlistName);
    onClose();
  };

  return (
    <div className={styles.createPlaylistPopup}> 
      <h2>Create Playlist</h2>
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
