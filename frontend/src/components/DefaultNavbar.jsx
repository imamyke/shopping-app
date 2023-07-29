import styled from "styled-components"
import { NavBar } from "antd-mobile"
import { useNavigate } from 'react-router-dom'


const DefaultNavbar = ({ back, title }) => {
  const navigate = useNavigate()

  return (
    <StyledNavbarContainer>
      <NavBar onBack={() => navigate(back)}>{title}</NavBar>
    </StyledNavbarContainer>
  )
}

export default DefaultNavbar

const StyledNavbarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: #fff;
  .adm-nav-bar-back-arrow {
    font-size: 14px;
  }
  .adm-nav-bar-title {
    font-size: 16px;
  }
`