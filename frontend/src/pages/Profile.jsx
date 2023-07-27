import avatar from '../uploads/avatar.jpeg'
import { useNavigate } from 'react-router-dom'
import styled from "styled-components"
import { Image, List, NavBar } from 'antd-mobile'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { useState } from 'react'

// 18681547948
const Profile = () => {
  const [image, setImage] = useState('')
  const [uploading, setUploading] = useState(false)

  const navigate = useNavigate()
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const dispatch = useDispatch()
  
  const handleUploadFile = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)
    try {
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
      const { data } = await axios.post('/api/upload', formData, config)
      setImage(data)
      setUploading(false)
    } catch(error) {
      console.log(error);
      setUploading(false)
    }
  }

  return (
    <>
      <StyledNavbarContainer>
        <NavBar onBack={() => navigate('/logout')}>修改个人信息</NavBar>
      </StyledNavbarContainer>
      <StyledImageContainer url={avatar}>
        <div className="image-container">
          <div className='edit-message'>修改头像</div>
          <div className="image"></div>
        </div>
      </StyledImageContainer>
      <form>
          <input 
            id='image-file' 
            type="file" 
            label="上傳圖片"
            onChange={(e) => handleUploadFile(e)}
          />
        </form>
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
            description={`帐号名: ${userInfo && userInfo.accountName}`}
          >
            {userInfo && userInfo.name}
          </List.Item>
        </List>
      </StyledList>
    </>
  )
}

export default Profile

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
const StyledImageContainer = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  margin: 20px auto 0 auto;
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