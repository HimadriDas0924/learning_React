import { MENU_IMAGE_URL } from "../utils/constants";

// Restaurant Menu - Accordion Body of each category containing multiple items
const ItemList = ({ itemArray }) => {
  //   console.log(itemArray);

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
                  <button className="font-semibold m-1 p-2 text-green-600 bg-white border-black border rounded-md">
                    Add +
                  </button>
                </div>
                {imageId ? (
                  <img
                    src={MENU_IMAGE_URL + imageId}
                    alt="item image"
                    className="rounded-lg w-[200px] h-auto object-cover"
                  />
                ) : (
                  <div className="rounded-lg w-[200px] h-[150px] object-cover bg-gray-300 flex justify-center items-center">
                    no image
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ItemList;
