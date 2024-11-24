import useRestaurantMenu from "../utils/useRestaurantMenu";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";

// loader -> api call -> update UI (bcz we update stateVar, so component refreshes)
const RestaurantMenu = () => {
  const { resId } = useParams(); // returns an Object of key-value pairs of the dynamic params from the current URL that were matched by the 'path' property of a path object in createBrowserRouter.

  // using custom hooks
  const resInfo = useRestaurantMenu(resId);

  const [categoryIndex, setCategoryIndex] = useState(0); // initially display 0th category as expanded. categoryIndex passes as props to child determines whether to display the child's body or not.

  // optinal chaining: if exp evaluates to 'undefined' or 'null' -> undefined is returned.
  const resName = resInfo?.cards[0]?.card?.card?.text;
  const cuisines = resInfo?.cards[2]?.card?.card?.info?.cuisines.join(", ");

  // console.log(resInfo);

  // array of items of each category
  const categories =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  return resInfo === null ? (
    <Shimmer />
  ) : (
    <div className="text-center">
      <div className="text-3xl font-semibold mt-10 mb-5">{resName}</div>
      <div className="text-xl font-medium text-red-500">{cuisines}</div>
      {/* categoies accordion -> each accordion has a header and collapsable body */}
      {categories.map((category, index) => (
        // RestaurantCategory -> Controlled Component
        <RestaurantCategory
          data={category?.card?.card}
          key={category?.card?.card?.title}
          showCategoryItems={categoryIndex === index}
          currentCategoryIndex={index}
          setExpandedCategoryIndex={setCategoryIndex}
          currentShownCategoryIndex={categoryIndex}
        />
      ))}
    </div>
  );
};

export default RestaurantMenu;
