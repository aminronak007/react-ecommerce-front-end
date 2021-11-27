import Search from "antd/lib/input/Search";
import React from "react";

const SearchBox = ({ keyword, setKeyword }) => {
  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  return (
    <>
      <Search
        type="search"
        placeholder="Search"
        value={keyword}
        onChange={handleSearchChange}
      />
    </>
  );
};

export default SearchBox;
