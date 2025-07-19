import "./styles.css";
import { useState } from "react";

const SearchBar = ({onSearch}) => {
  const [inputValue, setInputValue] = useState("");

   const handleSearch = (e) => {
    e.preventDefault();
    const trimmedValue = inputValue.trim();
    if (trimmedValue !== "") {
      onSearch(trimmedValue);
      setInputValue("");
    }
  };

  return (
    <form className="form-search" onSubmit={handleSearch}>
      <label className="search-bar">
        <input type="text" placeholder="Digite a cidade" value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
        <button type="submit">
          <img src="./search.svg" alt="ícone de busca" />
        </button>
      </label>
    </form>
  );
};

export default SearchBar;
