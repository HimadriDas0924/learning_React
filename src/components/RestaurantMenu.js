import useRestaurantMenu from "../utils/useRestaurantMenu";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import { MENU_IMAGE_URL } from "../utils/constants";

// loader -> api call -> update UI (bcz we update stateVar, so component refreshes)
const RestaurantMenu = () => {
  const { resId } = useParams(); // returns an Object of key-value pairs of the dynamic params from the current URL that were matched by the 'path' property of a path object in createBrowserRouter.

  // using custom hooks
  const resInfo = useRestaurantMenu(resId);

  // optinal chaining: if exp evaluates to 'undefined' or 'null' -> undefined is returned.
  const resName = resInfo?.cards[0]?.card?.card?.text;
  const menuArray =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.slice(2, -2);

  // console.log(menuArray);

  return resInfo === null ? (
    <Shimmer />
  ) : (
    <div className="menu m-2">
      <h1 className="font-bold text-center text-3xl py-2">{resName}</h1>
      <h3 className="text-xl p-2 font-semibold">Menu</h3>
      {
        // each section
        menuArray.map((titleObject, index) => {
          const { title: itemType, itemCards: itemArray } =
            titleObject?.card?.card;

          return itemArray === undefined ? null : ( // i.e display nothing
            <div key={index} className="menu-section m-6 shadow-xl">
              <h2 className="text-center font-semibold text-2xl py-2">
                {itemType}
              </h2>
              <ul className="each-section-container flex flex-wrap m-4 ">
                {
                  // all items of a particular section

                  itemArray.map((item) => {
                    const {
                      id,
                      name,
                      imageId,
                      defaultPrice,
                      price,
                      ratings: {
                        aggregatedRating: { rating },
                      },
                    } = item?.card?.info;

                    return (
                      <li
                        key={id}
                        className="w-[250px] m-4 p-4 bg-gray-100 border border-solid border-slate-700 rounded-md hover:shadow-lg"
                      >
                        <div className="menu-card flex flex-col">
                          <img
                            src={MENU_IMAGE_URL + imageId}
                            alt="item image 😋"
                            className="menu-card-img rounded-md"
                          />
                          <strong className="py-2">{name}</strong>
                          <em>
                            Price: {price ? price / 100 : defaultPrice / 100}
                          </em>
                          {/* {console.log(rating)} */}
                          {rating === undefined ? null : ( // display nothing.
                            <em>Rating: {rating + "⭐"}</em>
                          )}
                        </div>
                      </li>
                    );
                  })
                }
              </ul>
            </div>
          );
        })
      }
    </div>
  );
};

export default RestaurantMenu;
