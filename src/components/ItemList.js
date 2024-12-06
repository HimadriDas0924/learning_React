import { useDispatch } from "react-redux";
import { MENU_IMAGE_URL } from "../utils/constants";
import { addItem } from "../utils/cartSlice";

// Restaurant Menu - Accordion Body of each category containing multiple items
const ItemList = ({ itemArray }) => {
  //   console.log(itemArray);

  const dispatch = useDispatch(); // calling useDispatch hook returns a dispatch function.

  const handleAddItem = (item) => {
    // dispatch an action
    dispatch(addItem(item));
    /* 
      -> addItem(state, action) => why haven't we passed the state ? => bcz react internally manages it.

      -> Behind the scenes => addItem("pizza") => "pizza" is wrapped inside an object whose payload: "pizza" and then addItem is called with 2nd argument i.e action as this object. 
    */
  };

  return (
    <div>
      <div>
        {itemArray.map((item) => {
          const {
            defaultPrice,
            price,
            category,
            description,
            imageId,
            isBestseller,
            itemAttribute: { vegClassifier },
            name,
            ratings: {
              aggregatedRating: { rating, ratingCountV2 },
            },
            id,
          } = item?.card?.info;

          return (
            <div
              key={id}
              className="flex justify-between my-6 text-left px-3 pt-2 pb-6 border-b border-dashed border-gray-600"
            >
              <div className="w-8/12 pr-4">
                <div className="text-base font-semibold pt-1">{name}</div>
                <div className="text-base font-semibold pt-1">
                  {price ? "₹ " + price / 100 : "₹ " + defaultPrice / 100}
                </div>
                {rating ? (
                  <div className="pt-1">
                    {"⭐ " + rating + " (" + ratingCountV2 + ")"}
                  </div>
                ) : (
                  <></>
                )}
                <div className="pt-1">{category}</div>
                <div className="pt-1 font-extralight text-sm">
                  {description}
                </div>
              </div>
              <div>
                <div className="absolute">
                  <button
                    className="font-semibold m-1 p-2 text-white bg-black border-white border rounded-md"
                    onClick={() => handleAddItem(item)}
                  >
                    Add +
                  </button>
                </div>
                <div className="overflow-hidden h-[200px] w-[200px]">
                  {imageId ? (
                    <img
                      src={MENU_IMAGE_URL + imageId}
                      alt="item image"
                      className="rounded-lg w-[100%] h-[100%] object-cover object-center"
                    />
                  ) : (
                    <div className="rounded-lg w-[200px] h-[200px] object-cover bg-gray-300 flex justify-center items-center">
                      no image
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ItemList;
