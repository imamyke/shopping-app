import { NavBar } from "antd-mobile"
import { CloseOutline } from "antd-mobile-icons"
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

const Login = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  
  const { loading, error, userInfo } = userLogin

  return (
    <NavBar backArrow={<CloseOutline fontSize={14}  />} right="幫助" style={{ fontSize: '14px' }}>
    </NavBar>
  )
}

export default Login