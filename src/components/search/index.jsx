import { useEffect, useState } from "react";
import "./styles.css";

const Search = (props) => {
  const { getDataFromSearchComponent, apiCalledSuccess, setApiCalledSuccess } =
    props;
  const [inputValue, setInputValue] = useState("");

  const handleInputValue = (event) => {
    const { value } = event.target;
    setInputValue(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getDataFromSearchComponent(inputValue);
  };

  useEffect(() => {
    if (apiCalledSuccess) {
      setInputValue("");
      setApiCalledSuccess(false);
    }
  }, [apiCalledSuccess, setApiCalledSuccess]);

  return (
    <form className="Search" onSubmit={handleSubmit}>
      <input
        name="search"
        onChange={handleInputValue}
        value={inputValue}
        placeholder="Search Recipes"
        id="search"
      ></input>
      <button type="submit">Search</button>
    </form>
  );
};

export default Search;
