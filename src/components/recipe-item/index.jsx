import "./styles.css";
const RecipeItem = (props) => {
  const { id, image, title, addToFavorites } = props;
  return (
    <div key={id} className="recipe-item">
      <div>
        <img src={image} alt="image of a recipe"></img>
      </div>
      <p>{title}</p>
      <button type="button" onClick={addToFavorites}>
        Add to favorite
      </button>
    </div>
  );
};

export default RecipeItem;
