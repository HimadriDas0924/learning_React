import { useEffect, useState } from "react";
import { RES_MENU_API } from "./constants";

// this is NOT a functional Component BUT is a HOOK.
/* 
NOTE:

1. `useRestaurantMenu` is called inside `RestaurantMenu Component`, so it's hooks (useState, useEffect) are executed within the context of RestaurantMenu's lifecycle.

  - useState: so when state variable updates, RestaurantMenu is scheduled for re-render. bcz the COMPONENT inside which we use useState is re-rendered.

  - useEffect(cb, []): cb is called when `RestaurantMenu` is mounted for the 1st time. bcz when the COMPONENT inside which we use useEffect(cb, []) is mounted 1st time, then cb is called.

2. useRestaurantMenu doesn't have any independent lifecycle. bcz it's not a component. 

3. the (state , checking if we need to call useEffect) is preserved for each component. So if another Component uses useRestaurantMenu hook, then it's have a different state variable,check for useState, useEffect.

*/
const useRestaurantMenu = (resId) => {
  // fetch data + initially return null

  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(RES_MENU_API + resId);
    const json = await data.json();

    setResInfo(json.data);
  };

  return resInfo;
};

export default useRestaurantMenu;
