import styled from "styled-components";

const Header = ({ content }) => {
  return <HeaderContainer>{content}</HeaderContainer>;
};

export default Header;

const HeaderContainer = styled.h1``;
