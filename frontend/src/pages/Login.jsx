import { NavBar, Footer, TabBar } from "antd-mobile"
import { CloseOutline } from "antd-mobile-icons"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styled from "styled-components"
import { loginTabs } from '../constants'
import axios from 'axios'

const Login = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  
  const { loading, error, userInfo } = userLogin

  return (
    <>
      <NavBar backArrow={<CloseOutline fontSize={14}  />} right="幫助" style={{ fontSize: '14px' }}></NavBar>
      <StyledLoginContainer>
        <h1>短信验证码登录</h1>
        <form action="">
          <div className="form-container">
            <div className="form-item phone-container">
              <input type="text" placeholder="请输入手机号" />
            </div>
            <div className="form-item verify-code">
              <input type="text" placeholder="请输入验证码" />
              <button type="button">获取验证码</button>
            </div>
            <button type="submit" className="login-button">登录</button>
            <Link to="/signup" className="signup-link">新用戶注册</Link>
          </div>
        </form>
        <StyledFooterContainer>
          <Footer label='其他登录方式' style={{ fontSize: '12px', padding: '0 20px' }}></Footer>
          <StyledLoginTabs>
            {loginTabs.map(tab => 
              <a className="col" key={tab.key}>
                <StyledLoginCircle
                  {...tab.style}
                >
                </StyledLoginCircle>
                <StyledIcon className={tab.icon} iconColor={tab.iconColor} />
              </a>  
            )}
          </StyledLoginTabs>
        </StyledFooterContainer>
      </StyledLoginContainer>  
    </>
  )
}

export default Login


const StyledLoginTabs = styled.div`
  display: flex; 
  padding: 0 20px;
  .col {
    color: #000;
    position: relative;
    padding: 20px 10px;
    width: 25%;
    text-align: center;
    font-size: 18px;
  }
`
const StyledIcon = styled.i`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${props => props.iconColor};
`

const StyledLoginCircle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid ${props => props.circleBorder};
  background: ${props => props.circleBackground};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const StyledLoginContainer = styled.div`
  padding-top: 100px;
  h1 {
    text-align: center;
    padding-bottom: 10px;
    font-size: 18px;
    font-weight: bold;
  }
  .form-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    button {
      border: 0;
      border-radius: 20px;
    }
    .form-item {
      border-radius: 20px;
      overflow: hidden;
      margin-bottom: 20px;
      width: 100%;
      display: flex;
      background: #eeeeee;
      input {
        font-size: 14px;
        padding: 14px 20px;
        border: 0;
        background: #eeeeee;
        flex: 1;
      }
    }
    .form-item.verify-code {
      display: flex;
      button {
        width: 100px;
        font-size: 14px;
      }
    }
    .login-button {
      width: 100%;
      padding: 10px 20px;
      font-size: 16px;
      color: #fff;
      background: #f5c4bf;
    }
    .signup-link {
      text-decoration: none;
      margin-top: 20px;
      color: grey;
      font-size: 14px;
    }
  }
`

const StyledFooterContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding-bottom: 20px;
`