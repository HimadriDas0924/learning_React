import RestaurantCard from "./RestaurantCard";
import resList from "../utils/mockData";
import { useState } from "react"; // to create superpowerful state variables.

/* 
HOW TO DO SOMETHING ON CLICK in react

- just attach an attribute name 'onClick' to the element, whose value should be a JS callback fn.
- similary there are multiple attributes: onMouseOver, etc.
*/

const Body = () => {
  /*
  THEORY: 

  - how to use: useState -> creates a state variable && is used to maintain state of the component.

  - useState fn: returns a stateful value (1st val i.e listOfRestaurants) and a function to update it (2nd val i.e setListOfRestaurants).

  - i.e we cannot directly update the stateful variable. unless we use the function it returns to do so.

  - setListOfRestaurants(pass data that you want listOfRestaurants to be updated with).

  eg: suppose you want to make the listOfRestaurants empty: 
    - how to do ? 
      - setListOfRestaurants([]);
      - This is equivalent to doing: listOfRestaurants = [], if it was a normal JS variable.

  
  - As soon as the stateful variable changes using (setListOfRestaurants()), the COMPONENT will be automatically re-rendered.

  - When to use useState() ? 
    - Suppose a Component uses some data.
    - Using that data you're rendering something on the UI.
    - Now, based on some events you're changing the data.
    - Based on the changed data, you want UI to update.

    - const [data, changeDataFunction] = useState(default value of data);
      - As soon as you change the data based on some event.
        - do: changeDataFunction(modifiedData);

  - NOTE: whenever a state variable UPDATES, react RE-RENDERS the component.

      - Since, state variable has the update value && we're rendering the UI based on the state variable only. So that's why the UI changes.

      - react re-renders the component quickly.
  */

  // Local State Variable - superpowerful variable
  const [listOfRestaurants, setListOfRestaurants] = useState(resList); // we pass the default value as arg which could be anything.

  return (
    <div className="body">
      <div className="filter">
        <button
          className="filter-btn"
          onClick={() => {
            const filteredList = listOfRestaurants.filter(
              (res) => res?.info?.avgRating > 4
            );

            setListOfRestaurants(filteredList); // calling the function && pass in the udpated value of the stateful variable.
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
