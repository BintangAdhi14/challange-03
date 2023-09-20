import React from "react";

const Search = ({ searchTerm, onSearchTermChange }) => {
  const handleSearch = (event) => {
    event.preventDefault();
    // Lakukan sesuatu dengan nilai searchTerm, misalnya mengirimkannya ke server
    console.log(searchTerm);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input className="input-search"
          type="text"
          placeholder="Cari Item..."
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
        />
        <button className="search-button" type="submit">Search</button>
      </form>
    </div>
  );
};

export default Search;
