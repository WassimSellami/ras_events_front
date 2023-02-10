import Search from "../../components/search";
import RecipeItem from "../../components/recipe-item";
import FavoriteItem from "../../components/favorite-item";
import { useEffect, useState, useCallback } from "react";
import "./styles.css";

const Homepage = () => {
  //loading state
  const [loadingState, setLoadingState] = useState(false);

  // Save results that we receive from api
  const [recipes, setRecipes] = useState([]);

  // State for favorite recipes.
  const [favorites, setFavorites] = useState([]);

  // State for api call success
  const [apiCalledSuccess, setApiCallSuccess] = useState(false);
  const getDataFromSearchComponent = (getData) => {
    setLoadingState(true);
    async function getReceipes() {
      const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=52eb34320d174c16adbe95b20f34581f&query=${getData}`;
      const apiResponse = await fetch(url);
      const result = await apiResponse.json();
      const { results } = result;
      if (results && results.length > 0) {
        setRecipes(results);
        setLoadingState(false);
        setApiCallSuccess(true);
      }
      // fetch(url)
      // .then((response) => response.json())
      // .then((data) => console.log(data));
    }
    getReceipes();
  };

  const addToFavorites = useCallback(
    (currentRecipeItem) => {
      let cpyFavorites = [...favorites];
      const index = cpyFavorites.findIndex(
        (item) => item.id === currentRecipeItem.id
      );
      if (index === -1) {
        cpyFavorites.push(currentRecipeItem);
        setFavorites(cpyFavorites);
        localStorage.setItem("favorites", JSON.stringify(cpyFavorites));
      } else {
        alert("Item is already present in the favorites list !");
      }
    },
    [favorites]
  );

  const removeFromFavorites = useCallback(
    (currentRecipeId) => {
      let cpyFavorites = [...favorites];
      cpyFavorites = cpyFavorites.filter((item) => item.id !== currentRecipeId);
      setFavorites(cpyFavorites);
      localStorage.setItem("favorites", JSON.stringify(cpyFavorites));
    },
    [favorites]
  );

  useEffect(() => {
    const extractFavoritesFromLocalStorageOnPageLoad = JSON.parse(
      localStorage.getItem("favorites")
    );
    setFavorites(extractFavoritesFromLocalStorageOnPageLoad);
  }, []);

  const renderRecipes = useCallback(() => {
    {
      if (recipes && recipes.length > 0)
        return recipes.map((item) => (
          <RecipeItem
            key={item.id}
            id={item.id}
            image={item.image}
            title={item.title}
            addToFavorites={() => addToFavorites(item)}
          />
        ));
    }
  }, [recipes, addToFavorites]);

  const renderFavorites = useCallback(() => {
    if (favorites && favorites.length > 0)
      return favorites.map((item) => (
        <FavoriteItem
          key={item.id}
          id={item.id}
          image={item.image}
          title={item.title}
          removeFromFavorites={() => removeFromFavorites(item.id)}
        />
      ));
  }, [favorites, removeFromFavorites]);

  return (
    <div className="homepage">
      {!loadingState && (
        <Search getDataFromSearchComponent={getDataFromSearchComponent} />
      )}
      {loadingState && (
        <div className="loading"> Loading Recipes! Please wait.</div>
      )}

      <div className="favorites-wrapper">
        <h1 className="favorites-title"> Favorites</h1>
        <div className="favorites">{renderFavorites()}</div>
      </div>
      <div className="items">{renderRecipes()}()</div>
    </div>
  );
};

export default Homepage;
