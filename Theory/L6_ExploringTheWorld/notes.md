- `NOTE`: it may happen that the API may not return any response to you, so change the location in the app and get a new api from the networks tab.

- get data from a API and not use the dummy data.

- ## 1. Approach to Hit an API call:

  - `page loads` -> `render UI` (display some loader or just the skeleton)(i.e page has loaded) -> `hit api, wait to get data` -> `render UI using data again`.

  - So, the situation is: to do something, when the page is already loaded

    - ### USECASE(s) OF useEffect()

    1. if dependency array is empty: then cb of useEffect(cb, []) only executes once at startup bcz the arr never changes.

    ```javascript

    const Component = () => {
      // declare state variable using useState && use it to display cards
      // initially set to a default value i.e [] as in empty array of resObjects.
      const [resObjArray, setResObjArray] = useState([]);

      useEffect(() => {
        // this callback function is executed as soon as the page loads for the 1st time.
        fetchData();
      }, [])
      // 2nd arg: dependency array.

      const fetchData() {
        // fetch the data and update the stateVariable.
      }

      return (
        <div className="res-container">
        </div>
      )
    }

    ```

- `Conditional Rendering of components`

  - Display different Components based on some conditions.
  - eg: if, if-else, if-elseif, nested situations.
  - we can either directly return a component, or just use a component over there based on some conditions.

  ```javascript

  let displayShimmer = undefined;
  if(listOfRestaurants.length === 0) displayShimmer = true;

  const myComponent = () => {

    if(someOtherCondition) {
      return <h1>some other condition occured </h1>
    }

    return (
      {displayShimmer ? (
        <Shimmer />
      ) : (
        <div className="res-container">
          {listOfRestaurants.map((restaurant, index) => (
            <RestaurantCard key={restaurant.info.id} resData={restaurant} />
          ))}
        </div>
      )}
    )
  }

  ```

## 2. Understanding how useState() works and React Re-conciliation algorithm:

- setBtnName(updatedValue) : the component is getting re-rendered i.e Header is called again.

- new instance of btnName,setBtnName is created. btnName is initialized with updated value.

- New virtual DOM is created && compared with older virtual DOM (i.e a JS object representing the actual DOM) of the component.

- Using diff-algo, it's found out that only the button changes.

- so only the button is updated in the DOM and rest of the elements are untouched in the DOM.

- **NOTE :** the entire Component code will be executed, but based on virtual DOM comparison, only the required changes are reflected in the DOM.

```javascript
const Header = () => {
  const [btnName, setBtnName] = useState("Login");
  console.log("Header");

  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={header_logo_url} />
      </div>
      <div className="nav-items">
        <ul>
          {console.log("nav-items")}
          <li>Home</li>
          <li>About Us</li>
          <li>Contact Us</li>
          <li>Cart</li>
          <button
            className="login"
            onClick={() => {
              btnName === "Login" ? setBtnName("Logout") : setBtnName("Login");
            }}
          >
            {btnName}
          </button>
        </ul>
      </div>
    </div>
  );
};

// with every re render: console: Header nav-items
```

## 3. Implementing Search Functionality:

- **NOTE:**

  - `<input value = "default">` : value attribute contains the value which is sent to the server when the form is submitted.

  - Once `value` of the input box is set, it is reflected in the input box && cannot be manually changed by typing. To change it: either `don't keep a value` of the value attribute. OR we can change it using javascript.

  ```javascript
  const Body = () => {
    // list of all the restaurants
    const [listOfRestaurants, setListOfRestaurants] = useState([]);

    // list of filtered restaurants
    const [filteredRest, setFilteredRest] = useState([]);

    // input state variable (used for filtering res cards)
    const [searchText, setSearchText] = useState("");

    // as of now, this cb is executed only once.
    useEffect(() => {
      fetchData();
    }, []); // 2 arguments: 1st: arrow fn, 2nd: dependency array
    /* 
  - when is the callback function called ? 
    - as soon as the entire component is rendered i.e execution of component fn, then the cb fn is called.
  
  - USECASE: when we need to do something after rendering of the component, then write it inside useEffect();
  (here) after rendering the component we need to make an api call,wait for response && as soon as we get the response, re render the component with data from api.
  */

    console.log("Body component");

    const fetchData = async () => {
      console.log("fetching data of all res from api");
      // fetch() is provided by the Browser, not JS
      // fetch() returns a promise, which resolves to a readable stream. so convert it to json
      const data = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );

      const json = await data.json();

      // after getting the JSON data, update the stateVariable with this data, then component will automatically re render.

      const apiResObjArray =
        json?.data?.cards?.at(4)?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants;

      // NOTE: below both the update fn to udpate value of hooks are executed in a single re-render only.

      setListOfRestaurants(apiResObjArray);
      setFilteredRest(apiResObjArray);
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
            <RestaurantCard key={restaurant.info.id} resData={restaurant} />
          ))}
        </div>
      </div>
    );
  };
  ```
