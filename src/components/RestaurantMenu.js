import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import { MENU_IMAGE_URL, RES_MENU_API } from "../utils/constants";

// loader -> api call -> update UI (bcz we update stateVar, so component refreshes)
const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);

  const { resId } = useParams(); // returns an Object of key-value pairs of the dynamic params from the current URL that were matched by the 'path' property of a path object in createBrowserRouter.

  // fetch the data after the component loads for the 1st time
  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const data = await fetch(RES_MENU_API + resId);

    const json = await data.json();

    // console.log(json);

    // update state variable
    setResInfo(json.data);
  };

  // optinal chaining: if exp evaluates to 'undefined' or 'null' -> undefined is returned.
  const resName = resInfo?.cards[0]?.card?.card?.text;
  const menuArray =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.slice(2, -2);

  console.log(menuArray);

  return resInfo === null ? (
    <Shimmer />
  ) : (
    <div className="menu">
      <h1>{resName}</h1>
      <h3>Menu</h3>
      {
        // each section
        menuArray.map((titleObject, index) => {
          const { title: itemType, itemCards: itemArray } =
            titleObject?.card?.card;

          // console.log(itemType);
          // console.log("item array:");
          // console.log(itemArray);

          return itemArray === undefined ? null : ( // i.e display nothing
            <div key={index} className="menu-section">
              <h2>{itemType}</h2>
              <ul className="each-section-container">
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
                      <li key={id}>
                        <div className="menu-card">
                          <img
                            src={MENU_IMAGE_URL + imageId}
                            alt=""
                            className="menu-card-img"
                          />
                          <strong>{name}</strong>
                          <em>
                            Price: {price ? price / 100 : defaultPrice / 100}
                          </em>
                          {/* {console.log(rating)} */}
                          {rating === undefined ? null : ( // display nothing.
                            <em>Rating: {rating}</em>
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
