// named import
import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const {
    name,
    cuisines,
    avgRating: rating,
    sla: { deliveryTime: time },
    cloudinaryImageId,
  } = props?.resData?.info; // optional chaining

  return (
    <div className="res-card w-[250px] bg-gray-100 m-4 p-4 border border-slate-700 border-solid hover:shadow-lg rounded-lg">
      <img
        className="res-logo rounded-lg"
        src={CDN_URL + cloudinaryImageId}
        alt="res-logo-img"
      />
      <div className="card-text-container">
        <h3 className="font-bold py-2 text-lg">{name}</h3>
        <p>{cuisines.join(", ")}</p>
        <p>{rating + "⭐"}</p>
        <p>{time} minutes</p>
      </div>
    </div>
  );
};

// create a Higher Order Component

// i.e js fn that takes a Component as input and returns a new Component.

export const withIsOpen = (RestaurantCard) => {
  return (props) => {
    return (
      <div>
        <label className="absolute bg-black text-white rounded-md px-2 py-1 ml-4">
          currently Open
        </label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;

// we could've also done : <RestaurantCard resData = {props.resData} /> => but this requires us to break down what to pass.
// <RestaurantCard {...props} /> is equivalent to <RestaurantCard resData = {restaurant} />
// {...props} => what it does is {resData: restaurant} is what the component receives
// It's useful in case of HOC && wrapper => when we don't want to explicitely specify or break down the props.
