import RestaurantCard from "./RestaurantCard";
// import resList from "../utils/mockData.js";
import Shimmer from "./Shimmer";
import { useState, useEffect } from "react";

/* 
- Body Component is executed line by line
- As soon as it encouters useEffect(), it saves the cb fn to be called after rendering of Body.
*/
const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);

  const [searchText, setSearchText] = useState(""); // binding this state variable to the input box of search.

  console.log("Body component");

  useEffect(() => {
    fetchData();
  }, []); // 2 arguments: 1st: arrow fn, 2nd: dependency array
  /* 
  - when is the callback function called ? 
    - as soon as the entire component is rendered i.e execution of component fn, then the cb fn is called.

  - USECASE: when we need to do something after rendering of the component, then write it inside useEffect();
  (here) after rendering the component we need to make an api call,wait for response && as soon as we get the response, re render the component with data from api.
  */

  const fetchData = async () => {
    // fetch() is provided by the Browser, not JS
    // fetch() returns a promise, which resolves to a readable stream. so convert it to json
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    // console.log("fetch resolved promise data", data);

    const json = await data.json();
    // console.log("json converted promise data", json);

    // after getting the JSON data, update the stateVariable with this data, then component will automatically re render.

    const apiResObjArray =
      json?.data?.cards?.at(4)?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;

    // console.log("updated state variable is ", apiResObjArray);

    // update stateVariable
    setListOfRestaurants(apiResObjArray);
  };

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
                return name.includes(searchText.toLowerCase());
              });

              // console.log(filteredRes);
              setListOfRestaurants(filteredRes); // problem: we're filtering out our reqd value from the current value of listOfRestaurants and not from the original value. So we'll be getting wrong filtered out data OR no data at all i.e loader.
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

            setListOfRestaurants(filteredList); // calling the function && pass in the udpated value of the stateful variable. As soon as the variable updates, the UI is re rendered i.e functional component is re called.
          }}
        >
          Top Rated Restaurants
        </button>
      </div>
      <div className="res-container">
        {listOfRestaurants.map((restaurant, index) => (
          <RestaurantCard key={restaurant.info.id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;
