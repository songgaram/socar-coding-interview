import React from "react";
import { ModalBackground, ModalBox, ModalButton } from "./modal.style";
import CarDetail from "components/carDetail";

const Modal = ({ setIsOpenModal, isOpenModal, data }) => {
  const outsideRef = React.useRef(null);

  const handleCloseButtonClick = () => {
    setIsOpenModal(false);
  };

  // dim 영역 스크롤 방지
  React.useEffect(() => {
    document.body.style.cssText = `
      position: fixed;
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  // dim 영역 클릭 시 모달 Close
  React.useEffect(() => {
    const clickModalOutside = (event) => {
      if (isOpenModal && !outsideRef.current.contains(event.target)) {
        setIsOpenModal(false);
      }
    };
    document.addEventListener("mousedown", clickModalOutside);

    return () => {
      document.removeEventListener("mousedown", clickModalOutside);
    };
  });

  return (
    <ModalBackground>
      <ModalBox ref={outsideRef}>
        <ModalButton onClick={handleCloseButtonClick}>x</ModalButton>
        <CarDetail data={data} />
      </ModalBox>
    </ModalBackground>
  );
};

export default Modal;
