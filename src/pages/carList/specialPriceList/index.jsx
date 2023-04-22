import React from "react";
import CarCard from "components/carCard";
import getSpecialPriceList from "./hook/getSpecialPriceCarList";
import styled from "styled-components";
import clear from "./hook/clear";
import getClientX from "./hook/getClientX";
import Header from "components/header";
import debounce from "./hook/debounce";
import { CARTYPE, CARDWIDTH } from "./constant/constant";

const SpecialPriceList = ({ onMoveToElement, getClickedCarId }) => {
  const [specialPriceList, setSpecialPriceList] = React.useState([]);
  const [curIndex, setCurIndex] = React.useState(0);
  const [slideDisplacement, setSlideDisplacement] = React.useState(0);
  const [mouseDownClientX, setMouseDownClientX] = React.useState(0);

  const wholeWidth = specialPriceList.length * CARDWIDTH;

  const fetchSpecialPriceList = async () => {
    const res = await getSpecialPriceList();
    setSpecialPriceList(res);
    console.log(res);
  };

  React.useEffect(() => {
    fetchSpecialPriceList();
  }, []);

  const handleSlideStart = (e) => {
    setMouseDownClientX(() => getClientX(e));
  };

  // 슬라이딩 시 움직임
  const handleSlideMove = (e) => {
    if (mouseDownClientX) {
      setSlideDisplacement(() => getClientX(e) - mouseDownClientX);
    }
  };

  // 슬라이딩한 손을 뗀 후
  const handleSlideEnd = async (e, id) => {
    const mouseUpClientX = getClientX(e);
    const slideDistance = Math.abs(slideDisplacement);

    // 클릭의 경우 클릭이벤트 실행
    if (mouseDownClientX && slideDistance === 0) {
      handleSlideClick(id);
      return;
    }

    if (mouseDownClientX && slideDistance > 50) {
      // 우측 슬라이딩
      if (mouseUpClientX < mouseDownClientX) {
        // 인덱스가 마지막일 경우 슬라이드 x
        if (curIndex === specialPriceList.length - 1) {
          clear(setMouseDownClientX, setSlideDisplacement);
          return;
        }
        setCurIndex((prev) => prev + 1);

        // 좌측 슬라이딩
      } else if (mouseUpClientX > mouseDownClientX) {
        // 인덱스가 첫번째일 경우 슬라이드 x
        if (curIndex === 0) {
          clear(setMouseDownClientX, setSlideDisplacement);
          return;
        }
        setCurIndex((prev) => prev - 1);
      }
    }
    clear(setMouseDownClientX, setSlideDisplacement);
  };

  // 슬라이딩 중 이탈 시 clear
  const handleMouseLeave = (e) => {
    clear(setMouseDownClientX, setSlideDisplacement);
  };

  const handleSlideClick = async (id) => {
    // 클릭한 차량ID 업데이트하고 디바운스 후 타겟으로 스크롤
    await getClickedCarId(id);
    debounce(onMoveToElement);
  };

  return (
    <>
      {!specialPriceList ? (
        <div>차량 없음</div>
      ) : (
        <>
          <Header content={CARTYPE} />
          <Overflow>
            <CarListContainer
              width={`${wholeWidth}px`}
              transform={`translate(${-320 * curIndex + slideDisplacement}px)`}
            >
              {specialPriceList?.map((carData) => (
                <CarCard
                  type={CARTYPE}
                  carData={carData}
                  key={carData.carClassId}
                  width={CARDWIDTH}
                  onMouseDown={handleSlideStart}
                  onTouchStart={handleSlideStart}
                  onMouseMove={handleSlideMove}
                  onTouchMove={handleSlideMove}
                  onMouseUp={(e) => handleSlideEnd(e, carData.carClassId)}
                  onTouchEnd={(e) => handleSlideEnd(e, carData.carClassId)}
                  onMouseLeave={handleMouseLeave}
                />
              ))}
            </CarListContainer>
          </Overflow>
        </>
      )}
    </>
  );
};

export default SpecialPriceList;

const Overflow = styled.div`
  overflow: auto;
  white-space: nowrap;
  padding-left: 50px;
`;

const CarListContainer = styled.div`
  width: ${(props) => props.width};
  transform: ${(props) => props.transform};
  transition: transform 0.3s;
`;
