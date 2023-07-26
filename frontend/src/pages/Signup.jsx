import axios from 'axios'
import { phoneReg, verifyCodeReg } from '../constants'
import { NavBar, Toast, SpinLoading, NoticeBar } from "antd-mobile"
import { useNavigate } from 'react-router-dom'
import styled from "styled-components"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { signup } from '../store/actions'

const Signup = () => {
  const navigate = useNavigate()
  const [phoneNumer, setPhoneNumer] = useState('')
  const [code, setCode] = useState('')
  const [time, setTime] = useState(null)

  const userSignup = useSelector(state => state.userSignup)
  const { loading, error, userInfo } = userSignup
  const dispatch = useDispatch()
  
  const handleVerifyCode = async () => {
    const phone = phoneNumer
    if (phoneReg.test(phone)) {
      const { data } = await axios.post(
        'http://localhost:5000/api/users/verifycode',
        { phone })
      setCode(data.code)
      count()
    } else {
      Toast.show({
        icon: 'fail',
        content: '手机号格式不合法',
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const verifyCode = code
    if (verifyCodeReg.test(verifyCode)) {
      dispatch(signup(phoneNumer, verifyCode))
    } else {
      Toast.show({
        icon: 'fail',
        content: '验证码格式不合法',
      })
    }
  }

  // 18681547948
  const count = () => {
    let timer = null
    let sec = 60
    timer = setInterval(() => {
      sec--
      setTime(sec)
      if (sec <= 0) {
        clearInterval(timer)
        return false
      }
    }, 1000)
  }
  
  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }
  }, [userInfo, navigate])

  console.log(userInfo, error);
  return (
    <>
      <StyledNavbarContainer>
        <NavBar onBack={() => navigate('/login')}></NavBar>
      </StyledNavbarContainer>
      <StyledLoginContainer>
        <h1>手机号快速注册</h1>
        <StyledLoading>
          { loading && <SpinLoading style={{ '--size': '48px' }} /> }
        </StyledLoading>
        <form onSubmit={handleSubmit}>
          <div className="form-container">
            <div className="form-item phone-container">
              <input 
                type="text" 
                placeholder="请输入手机号" 
                value={phoneNumer}
                onChange={(e) => setPhoneNumer(e.target.value)}
              />
            </div>
            <div className="form-item verify-code">
              <input 
                type="text" 
                placeholder="请输入验证码"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <button 
                className='verify-button'
                type="button" 
                onClick={handleVerifyCode}
                disabled={time > 0 && true}
              >{time > 0 && `(${time})`}获取验证码</button>
            </div>
            <button 
              type="submit" 
              className="login-button" 
            >一键快速注册</button>
          </div>
          <div className='error'>
            { error && <NoticeBar color='alert' content={error} /> }
          </div>
        </form>
      </StyledLoginContainer>  
    </>
  )
}

export default Signup

const StyledNavbarContainer = styled.div`
  .adm-nav-bar-back-arrow {
    font-size: 14px;
  }
`

const StyledLoginContainer = styled.div`
  padding-top: 100px;
  h1 {
    text-align: center;
    padding-bottom: 10px;
    font-size: 18px;
    font-weight: bold;
  }
  .error {
    padding: 0 20px;
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
      input:focus {
        border: 0;
        outline: 0;
      }
    }
    .form-item.verify-code {
      display: flex;
      button {
        width: 100px;
        font-size: 14px;
      }
      button:disabled {
        color: #fb5d5a;
        font-size: 8px;
      }
    }
    .login-button {
      width: 100%;
      padding: 10px 20px;
      font-size: 16px;
      color: #fff;
      background: #fb5d5a;
    }
    .signup-link {
      text-decoration: none;
      margin-top: 20px;
      color: grey;
      font-size: 14px;
    }
  }
`

const StyledLoading = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`