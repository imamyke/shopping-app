import avatar from '../uploads/avatar.jpeg'
import styled from "styled-components"
import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'
import { Loader } from '../components'
import { EditSFill } from 'antd-mobile-icons'
import { NavBar, Toast } from 'antd-mobile'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect, useRef } from 'react'
import { getUserDetail, updateUserProfile } from '../store/actions'
import { USER_UPDATE_PROFILE_RESET } from '../store/types/userConstants'

// 18681547948
const Profile = () => {
  const inputRef = useRef(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const userDetail = useSelector(state => state.userDetail)
  const { loading, user , error } = userDetail
  const userUpdateProfile = useSelector(state => state.userUpdate)
  const { success } = userUpdateProfile

  const [image, setImage] = useState('')
  const [uploading, setUploading] = useState(false)
  const [name, setName] = useState(user.name)
  const [accountName, setAccountName] = useState(user.accountName)
  const [phone, setPhone] = useState(user.phone)
  const [edit, setEdit] = useState(false)


  useEffect(() => {
    if (!userInfo) {
      navigate('/')
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET})
        dispatch(getUserDetail('profile'))
      } else {
        setName(user.name)
        setAccountName(user.accountName)
        setPhone(user.phone)
      }
    }
  }, [userInfo, navigate, dispatch, user, success])
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !accountName || !phone) {
      Toast.show({
        content: '还有信息没填写完唷',
        duration:'2000'
      })
      return
    } else {
      dispatch(updateUserProfile({ name, accountName, phone }))
      setEdit(false)
    }
  }
  

  return (
    <>
      <StyledNavbarContainer>
        <NavBar onBack={() => navigate('/logout')}>修改个人信息</NavBar>
      </StyledNavbarContainer>
      
        <StyledPersonalInfo>
          <StyledImageContainer url={avatar}>
            <div className="image-container">
              <div className='edit-message'>修改头像</div>
              <div className="image"></div>
            </div>
          </StyledImageContainer>
          <StyledFormContainer>
            <div style={{ position: 'relative', paddingTop: '40px' }}>
              <div className='edit'>
                <EditSFill onClick={() => setEdit(true)} />
              </div>
              <form onSubmit={handleSubmit}>
                <div className='form-item'>
                  <label htmlFor="name">名稱</label>
                  <span 
                    className={clsx('', { inputBody: true, isEdit: edit })}
                  >{name}</span>
                  <input 
                    className={clsx('', { isEdit: edit })}
                    ref={inputRef}
                    id='name' type="text" 
                    placeholder='请输入名稱' 
                    defaultValue={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className='form-item'>
                  <label htmlFor="nickName">帐号名</label>
                  <span 
                    className={clsx('', { inputBody: true, isEdit: edit })}
                  >{accountName}</span>
                  <input 
                    className={clsx('', { isEdit: edit })}
                    ref={inputRef}
                    id='nickName' type="text" 
                    placeholder='请输入暱稱' 
                    defaultValue={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                    required
                  />
                </div>
                <div className='form-item'>
                  <label htmlFor="phone">手机号码</label>
                  <span 
                    className={clsx('', { inputBody: true, isEdit: edit })}
                  >{phone}</span>
                  <input id='phone' type="text" 
                    className={clsx('', { isEdit: edit })}
                    ref={inputRef}
                    placeholder='请输入收货人手机号码'
                    defaultValue={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <div className="update-button">
                  <button 
                    type='submit'
                    className={clsx('', { isEdit: edit })}
                  >
                    确定
                  </button>
                </div>
              </form>
            </div>
            
          </StyledFormContainer>
        </StyledPersonalInfo>
    </>
  )
}

export default Profile

const StyledFormContainer = styled.div`
  position: relative;
  background: #fff;
  margin-bottom: 85px;
  padding: 10px;
  .update-button {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    button {
      display: none;
      border: 0;
      background: rgb(225, 37, 27);
      padding: 4px 50px;
      color: #fff;
      border-radius: 10px;
    }
    button.isEdit {
      display: block;
    }
  }
  .edit {
    position: absolute;
    top: 16px;
    right: 16px;
    font-size: 16px;
    color: #666;
  }  
  .form-item {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
  } 
  label {
    width: 60px;
    font-weight: bold;
    font-size: 12px;
  }
  .inputBody, input {
    text-align: right;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 12px;
    color: #888;
    flex: 1;
    padding: 0;
  }
  .inputBody.isEdit {
    display: none;
  }
  input.isEdit {
    display: block;
  }
  .inputBody {
    display: block;
  }
  input {
    display: none;
    border: 0;
    &:focus {
      outline: 0;
    }
  }
`

const StyledPersonalInfo = styled.div`
  background: #fff;
  padding-top: 20px;
`

const StyledNavbarContainer = styled.div`
  background-color: #fff;
  .adm-nav-bar-back-arrow {
    font-size: 14px;
  }
  .adm-nav-bar-title {
    font-size: 16px;
  }
`
const StyledImageContainer = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto;
  border-radius: 50%;
  overflow: hidden;
  .image-container {
    width: 100%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: #000;
    &:hover, &:hover .edit-message{
      opacity: 0.7;
    }
    .edit-message {
      transition: opacity 0.3s ease-out;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      padding: 10px 0;
      width: 100%;
      text-align: center;
      background: #000;
      opacity: 0;
      color: #fff;
      border: 1px solid #000;
      z-index: 10000;
    }
  }
  .image-container:before {
    display: block;
    content: '';
    padding-top: 100%;
  }
  .image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: ${props => `url(${props.url})`};
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
`