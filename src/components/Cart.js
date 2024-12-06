import { useDispatch, useSelector } from "react-redux";
import { EMPTY_CART_IMAGE, MENU_IMAGE_URL } from "../utils/constants";
import { clearCart } from "../utils/cartSlice";

const Cart = () => {
  // how to read data from the store => make the Cart component subsribe to the store using selector => useSelector(cb fn which receives store as a parameter && return what you need from a slice from the fn).
  const items = useSelector((store) => store.cart.items);
  console.log(items);

  const dispatch = useDispatch(); // returns a dispatch fn
  const handleClearCart = () => {
    // dispatch an action which'll call a cb function which will clear the cart slice data.
    dispatch(clearCart());
  };

  return (
    <div className="m-4 p-4 w-8/12 mx-auto">
      <div className="flex justify-around py-4">
        <h1 className="font-semibold text-2xl">Cart</h1>
        {items.length > 0 && (
          <button
            className="p-2 bg-red-600 rounded-lg font-semibold text-lg text-white"
            onClick={handleClearCart}
          >
            clear cart
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <img src={EMPTY_CART_IMAGE} className="mx-auto" />
      ) : (
        <div className="p-2 bg-gray-100 rounded-lg">
          {items.map((item) => {
            // destructre the item
            const {
              id,
              imageId,
              name,
              ratings: { aggregatedRating },
              price,
              defaultPrice,
            } = item?.card?.info;

            return (
              <div
                key={id}
                className="p-4 text-left flex justify-between mb-4 border-b border-dashed border-gray-500 "
              >
                <div className="mr-4">
                  <p>
                    <span className="font-semibold">name :</span> {name}
                  </p>
                  {aggregatedRating?.rating && (
                    <p>
                      <span className="font-semibold">rating :</span>{" "}
                      {aggregatedRating?.rating} ⭐
                    </p>
                  )}
                  {defaultPrice ? (
                    <p>
                      <span className="font-semibold">price :</span>
                      {" Rs "}
                      {defaultPrice / 100}{" "}
                    </p>
                  ) : (
                    <p>
                      <span className="font-semibold">price :</span>
                      {" Rs "}
                      {price / 100}
                    </p>
                  )}
                </div>
                <div className="overflow-hidden h-[200px] w-[200px] ">
                  <img
                    src={MENU_IMAGE_URL + imageId}
                    alt="no image available"
                    className="object-cover object-center h-[100%] w-[100%] rounded-lg"
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Cart;
