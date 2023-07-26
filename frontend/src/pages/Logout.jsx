import avatar from '../assets/images/avatar.jpeg'
import { NavBar, Modal, Button } from "antd-mobile"
import { useNavigate } from 'react-router-dom'
import styled from "styled-components"
import { Image, List } from 'antd-mobile'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/actions'

// 18681547948
const Logout = () => {
  const navigate = useNavigate()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const dispatch = useDispatch()

  const handleLogout = async () => {
    dispatch(logout())
  }
  
  return (
    <>
      <StyledNavbarContainer>
        <NavBar onBack={() => navigate('/')}>帐户设置</NavBar>
      </StyledNavbarContainer>
      <StyledList>
        <List mode='card'>
          <List.Item
            prefix={
              <Image
                src={avatar}
                style={{ borderRadius: 20 }}
                fit='cover'
                width={40}
                height={40}
              />
            }
            onClick={() => navigate('/profile')}
            description={`帐号名: ${userInfo.accountName || 'imamyke'}`}
          >
            {userInfo.name || '思宇 Amy'}
          </List.Item>
        </List>
      </StyledList>
      <StyledLogout>
        <Button
          type='button'
          onClick={handleLogout}
        >退出登录</Button>
      </StyledLogout>
    </>
  )
}

export default Logout

const StyledNavbarContainer = styled.div`
  .adm-nav-bar-back-arrow {
    font-size: 14px;
  }
  .adm-nav-bar-title {
    font-size: 16px;
  }
`
const StyledList = styled.div`
  .adm-list-item-content {
    border-top: 0;
  }
`
const StyledLogout = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  button {
    font-size: 14px;
    background: #f5c4bf;
    color: #fff;
    padding: 14px 60px;
    border-radius: 24px;
    border: 0;
  }
`