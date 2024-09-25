- `NOTE`: it may happen that the API may not return any response to you, so change the location in the app and get a new api from the networks tab.

- get data from a API and not use the dummy data.

- Approach to do so:

  - `page loads` -> `render UI` (display some loader or just the skeleton)(i.e page has loaded) -> `hit api, wait to get data` -> `render UI using data again`.

  - So, the situation is: to do something, when the page is already loaded

    - use: useEffect(() => {}, [])

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
