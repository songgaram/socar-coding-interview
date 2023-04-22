import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
 from {
    background: rgba(0, 0, 0, 0%);
  }

  to {
    background: rgba(0, 0, 0, 30%);
    backdrop-filter: blur(5px);
  }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8) translateY(100%);
  }

  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`;

const ModalBackground = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  animation: ${fadeIn} 0.4s cubic-bezier(0.5, 0, 0, 0.8) forwards;
`;

const ModalBox = styled.div`
  overflow: scroll;
  align-items: center;
  width: 400px;
  height: 400px;
  padding: 50px;
  background: #ffffff;
  animation: ${slideUp} 0.4s cubic-bezier(0.5, 0, 0, 0.8) forwards;
`;

const ModalButton = styled.button`
  position: fixed;
  left: 85%;
`;

export { ModalBackground, ModalBox, ModalButton };
