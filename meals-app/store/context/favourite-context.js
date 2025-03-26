const { createContext, useState } = require('react');

export const FavouriteContext = createContext({
  ids: [],
  addFavourite: (id) => {},
  removeFavourite: (id) => {},
});

function FavouriteContextProvider({ children }) {
  const [favMealId, setFavMealId] = useState([]);

  function addFav(id) {
    setFavMealId((prev) => [...prev, id]);
  }

  function removeFav(id) {
    setFavMealId((prev) => prev.filter((mealId) => mealId !== id));
  }

  const value = {
    ids: favMealId,
    addFavourite: addFav,
    removeFavourite: removeFav,
  };

  return <FavouriteContext.Provider value={value}>{children}</FavouriteContext.Provider>;
}

export default FavouriteContextProvider;
