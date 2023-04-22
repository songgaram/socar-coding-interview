import React from "react";
import SpecialPriceList from "./specialPriceList";
import AllCarList from "./allCarList";
import useMoveScroll from "./hook/useMoveScroll";

const CarList = () => {
  const { target, onMoveToElement } = useMoveScroll();

  const [clickedCarId, setClickedCarId] = React.useState(null);

  const getClickedCarId = (id) => {
    setClickedCarId(id);
  };

  return (
    <>
      <SpecialPriceList
        onMoveToElement={onMoveToElement}
        getClickedCarId={getClickedCarId}
      />
      <AllCarList ref={target} clickedCarId={clickedCarId} />
    </>
  );
};

export default CarList;
