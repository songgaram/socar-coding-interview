import React from "react";
import { Outlet } from "react-router-dom";
import Header from "components/header";
import styled from "styled-components";

const Layout = () => {
  const HEADER_CONTENT = "차량 리스트";
  return (
    <>
      <MainContainer>
        <MainContent>
          <HeaderContainer>
            <Header content={HEADER_CONTENT} />
          </HeaderContainer>
          <Outlet />
        </MainContent>
      </MainContainer>
    </>
  );
};

export default Layout;

const MainContainer = styled.main`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const MainContent = styled.section`
  width: 420px;
  height: 100%;
  border: 1px solid;
`;

const HeaderContainer = styled.header`
  text-align: center;
`;
