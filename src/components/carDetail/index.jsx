import React from "react";
import styled from "styled-components";

const CarDetail = ({ data }) => {
  const {
    carClassName,
    carImage,
    market,
    carModel,
    fuel,
    gearbox,
    capacity,
    safetyOption,
    additionalOption,
  } = data[0];

  const detailData = [
    `제조사: ${market}`,
    `분류: ${carModel}`,
    `연료: ${fuel}`,
    `변속방식: ${gearbox}`,
    `승차정원: ${capacity}`,
  ];

  return (
    <>
      <DetailImg src={carImage} />
      <DetailTitle>{carClassName}</DetailTitle>

      {detailData.map((data) => (
        <DetailContent>{data}</DetailContent>
      ))}

      <DetailSubtitle>안전옵션</DetailSubtitle>
      {safetyOption.map((data) => (
        <DetailContent>- {data}</DetailContent>
      ))}

      <DetailSubtitle>편의옵션</DetailSubtitle>
      {additionalOption.map((data) => (
        <DetailContent>- {data}</DetailContent>
      ))}
    </>
  );
};

export default CarDetail;

const DetailImg = styled.img`
  width: 50%;
`;
const DetailTitle = styled.h1``;
const DetailSubtitle = styled.h3``;
const DetailContent = styled.p``;
