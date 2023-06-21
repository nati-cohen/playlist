import styles from "./style.module.css";
import { useState } from "react";
import DataContext from "../../Context/DataContext";
import { GiMusicSpell } from "react-icons/gi";
import React, { useContext } from "react";

export default function SearchInput() {
  const { setSearch } = useContext(DataContext);
  const [rotated, setRotated] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  const handleClick = () => {
    setRotated(!rotated);
    setSearch(searchInput);
  };

  return (
    <div className={styles.search}>
      <input
        type="search"
        placeholder="Search..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={handleEnter}
      />
      {searchInput && (
        <GiMusicSpell
          className={`${styles.searchIcon} ${rotated ? styles.rotated : ""}`}
          onClick={handleClick}
        />
      )}
    </div>
  );
}