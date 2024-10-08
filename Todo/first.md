1. How to implement : scroll past a point to trigger something: (in swiggy application) if you scroll past a point after cards, then new cards are loaded i.e `LAZY LOADING`

   - so later learn code splitting and lazy loading.

   - a fetch POST call is made to some API.

   - LEARN: how to keep track of scroll position to trigger an API.

```javascript
const data = {
  // below latitude and longitude of bangalore
  lat: 12.9715987,
  lng: 77.5945627,
  nextOffset: "CJhlELQ4KIDgnNKEr7K/FjCnEzgD",
  widgetOffset: {
    NewListingView_category_bar_chicletranking_TwoRows: "",
    NewListingView_category_bar_chicletranking_TwoRows_Rendition: "",
    Restaurant_Group_WebView_PB_Theme: "",
    Restaurant_Group_WebView_SEO_PB_Theme: "",
    collectionV5RestaurantListWidget_SimRestoRelevance_food_seo: "69", // 69 here: displays starting card position, we can put in anything: but with next call: put here(curno + #extra cards displayed in the UI + 1)
    inlineFacetFilter: "",
    restaurantCountWidget: "",
  },
  filters: {},
  seoParams: {
    seoUrl: "https://www.swiggy.com/",
    pageType: "FOOD_HOMEPAGE",
    apiName: "FoodHomePage",
  },
  page_type: "DESKTOP_WEB_LISTING",
  _csrf: "4aICWP9Rmj0v-Vit8wW-DgE6CIPXT9iBjyiSVQiY",
};

// making a fetch post call: just pass some data to server as JSON string.
fetch("https://www.swiggy.com/dapi/restaurants/list/update", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
})
  .then((data) => data.json())
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
```
