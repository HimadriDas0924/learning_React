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
