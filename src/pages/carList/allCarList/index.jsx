import React from "react";
import Header from "components/header";
import styled from "styled-components";
import CarCard from "components/carCard";
import getAllCarListByPage from "./hook/getAllCarListByPage";
import Modal from "components/modal";
import ModalPortal from "components/modal/modalPotal";
import { CARTYPE, PERPAGE } from "./constant/constant";
import getCarById from "./hook/getCarById";

const AllCarList = React.forwardRef(({ clickedCarId }, ref) => {
  const [allCarList, setAllCarList] = React.useState([]);
  const [isLastPage, setIsLastPage] = React.useState(false);
  const [page, setPage] = React.useState(1);

  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [data, setData] = React.useState([]);

  const [isFetchCompleted, setIsFetchCompleted] = React.useState(false);

  const fetchAllCarList = async () => {
    const { carList, isLastPage } = await getAllCarListByPage(page, PERPAGE);
    setAllCarList(carList);
    setIsLastPage(isLastPage);
    setIsFetchCompleted(true);
  };

  React.useEffect(() => {
    fetchAllCarList();
  }, [page]);

  const changePageByCarId = () => {
    if (clickedCarId) {
      if (clickedCarId > page * PERPAGE) {
        setPage(parseInt((clickedCarId - 1) / PERPAGE) + 1);
      }
    }
  };

  React.useEffect(() => {
    changePageByCarId();
  }, [clickedCarId]);

  const handleExpandMore = () => {
    setPage((prev) => prev + 1);
  };

  const handleClick = async (id) => {
    const carData = await getCarById(id);
    setData(carData);
    setIsOpenModal(true);
  };

  if (!isFetchCompleted) {
    return <div>로딩중...🔥</div>;
  }

  return (
    <>
      {!allCarList ? (
        <div>차량 없음</div>
      ) : (
        <>
          <Header content={CARTYPE} />
          <AllCarListContainer>
            {allCarList?.map((carData, idx) => (
              <CarCard
                type={CARTYPE}
                carData={carData}
                key={carData.carClassId}
                onClick={() => handleClick(carData.carClassId)}
                ref={idx + 1 === clickedCarId ? ref : null}
              />
            ))}
            {!isLastPage && (
              <ExpandMoreBtn onClick={handleExpandMore}>더보기</ExpandMoreBtn>
            )}
          </AllCarListContainer>
          <ModalPortal>
            {isOpenModal && (
              <Modal
                setIsOpenModal={setIsOpenModal}
                isOpenModal={isOpenModal}
                data={data}
              />
            )}
          </ModalPortal>
        </>
      )}
    </>
  );
});

export default AllCarList;

const AllCarListContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ExpandMoreBtn = styled.button`
  width: 100px;
  height: 50px;
`;
