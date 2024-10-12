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
    <div className="res-card">
      <img
        className="res-logo"
        src={CDN_URL + cloudinaryImageId}
        alt="res-logo-img"
      />
      <div className="card-text-container">
        <h3>{name}</h3>
        <p>{cuisines.join(", ")}</p>
        <p>{rating + "⭐"}</p>
        <p>{time} minutes</p>
      </div>
    </div>
  );
};

export default RestaurantCard;
