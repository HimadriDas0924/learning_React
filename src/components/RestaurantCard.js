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
    <div className="res-card w-[250px] bg-gray-100 m-4 p-4 border border-slate-700 border-solid hover:shadow-lg rounded-lg dark:bg-gray-800 dark:text-white dark:border dark:border-white dark:border-solid dark:hover:shadow-white">
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

export default RestaurantCard;
