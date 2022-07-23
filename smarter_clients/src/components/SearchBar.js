import React, { useState } from "react";
import "./css/SearchBar.css";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import Li from "./Li";

function SearchBar({placeholder,searchAddClicked,data,skillsLinksClicked }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([...filteredData,data[1]]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {filteredData.length !== 0 && (
        <div className="dataResult">
          <span onClick={(e)=>searchAddClicked(e)}  className="addBtn">
        <span className="ico"><AddIcon/></span>
        <span  className="txt">Add a New Skill</span>
      </span> 
          {filteredData.map((value, key) => {
            return (
              <Li skillsLinksClicked={skillsLinksClicked} key={key} text={value.toUpperCase()}/>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
