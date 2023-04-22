import React from "react";
import styled from "styled-components";
import getFormatCarData from "./utils/getFormatPrice";
import omitFooter from "./utils/omitFooter";

const CarCard = React.forwardRef(
  (
    {
      type,
      carData,
      onMouseDown,
      onTouchStart,
      onMouseMove,
      onTouchMove,
      onMouseUp,
      onTouchEnd,
      onMouseLeave,
      onClick,
      value,
    },
    ref
  ) => {
    const { image, carClassName, carTypeTags } = carData;
    const { formatPrice, formatFooter } = getFormatCarData(carData);

    return (
      <CardContainer
        type={type}
        value={value}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onMouseMove={onMouseMove}
        onTouchMove={onTouchMove}
        onMouseUp={onMouseUp}
        onTouchEnd={onTouchEnd}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        ref={ref}
      >
        <CarImg src={image} alt="자동차 이미지" />
        <CarContent>{carClassName}</CarContent>
        {type === "모든 차량" &&
          carTypeTags.map((tag) => <CarTag>{tag}</CarTag>)}
        <CarContent>{formatPrice}</CarContent>
        <CarContent>
          {type === "특가 차량" ? omitFooter(formatFooter) : formatFooter}
        </CarContent>
      </CardContainer>
    );
  }
);

export default CarCard;

const CardContainer = styled.article`
  width: 300px;
  height: 200px;
  border: 1px solid black;
  display: inline-block;
  margin: ${(props) => (props.type === "특가 차량" ? "0 10px" : "10px")};
`;

const CarImg = styled.img`
  width: 60%;
`;

const CarContent = styled.div``;

const CarTag = styled.span`
  border: 1px solid;
`;
