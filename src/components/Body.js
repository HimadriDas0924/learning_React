import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // go to different different routes (defined in path objects) without page-reload.
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  // check online status using customHook
  const onlineStatus = useOnlineStatus();

  // list of all the restaurants
  const [listOfRestaurants, setListOfRestaurants] = useState([]);

  // list of filtered restaurants
  const [filteredRest, setFilteredRest] = useState([]);

  // input state variable (used for filtering res cards)
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []); // 2 arguments: 1st: arrow fn, 2nd: dependency array

  console.log("Body component");

  const fetchData = async () => {
    console.log("fetching data of all res from api");

    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    const json = await data.json();

    const apiResObjArray =
      json?.data?.cards?.at(4)?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;

    setListOfRestaurants(apiResObjArray);
    setFilteredRest(apiResObjArray);
  };

  if (onlineStatus === false)
    return (
      <h1>Hey! looks like you're OFFLINE, check your internet connection.</h1>
    );

  // state variable empty: display loader. else display the body
  return listOfRestaurants.length == 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            className="search-box"
            value={searchText}
            onChange={(e) => {
              // whatever we type is displayed in the input box.
              setSearchText(e.target.value);
            }}
          />
          <button
            onClick={() => {
              // filter the restaurant card and update the UI.
              const filteredRes = listOfRestaurants.filter((resObj) => {
                const name = resObj?.info?.name.toLowerCase();
                return name.includes(searchText.trim().toLowerCase());
              });

              setFilteredRest(filteredRes);
            }}
          >
            Search
          </button>
        </div>
        <button
          className="filter-btn"
          onClick={() => {
            const filteredList = listOfRestaurants.filter(
              (res) => res?.info?.avgRating > 4.3
            );

            setFilteredRest(filteredList); // calling the function && pass in the udpated value of the stateful variable. As soon as the variable updates, the UI is re rendered i.e functional component is re called.
          }}
        >
          Top Rated Restaurants
        </button>
      </div>
      <div className="res-container">
        {filteredRest.map((restaurant, index) => (
          <Link
            className="link-res-card"
            to={"/restaurants/" + restaurant.info.id}
            key={restaurant.info.id} // NOTE: 'key' should be within the parent element used within a map.
          >
            <RestaurantCard resData={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
