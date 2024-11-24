import ItemList from "./ItemList";

// Restaurant Category Accordion
// to implement: show && hide feature -> stateVariable && when we click on (close) set value of stateVariable and re-render component.

const RestaurantCategory = ({
  data,
  showCategoryItems,
  setExpandedCategoryIndex,
  currentShownCategoryIndex,
  currentCategoryIndex,
}) => {
  //   console.log(data);

  const handleClick = () => {
    // updating the parent's state via the cb fn. So parent re-render
    if (currentShownCategoryIndex === currentCategoryIndex) {
      // so we want to close current category body
      setExpandedCategoryIndex(null); // i.e no category has expanded body
    } else {
      // expand only the current category's body
      setExpandedCategoryIndex(currentCategoryIndex);
    }
  };

  return (
    <div>
      <div className="w-8/12 bg-gray-100 mx-auto my-6 shadow-lg py-3 px-3">
        <div
          className="flex justify-between hover:cursor-pointer"
          onClick={handleClick}
        >
          {/* Accordion Header */}
          <span className="text-lg font-semibold">
            {data.title + " (" + data?.itemCards?.length + ")"}
          </span>
          <span>🔽</span>
        </div>
        {/* Accordion Body */}
        {showCategoryItems && <ItemList itemArray={data.itemCards} />}
      </div>
    </div>
  );
};
export default RestaurantCategory;
