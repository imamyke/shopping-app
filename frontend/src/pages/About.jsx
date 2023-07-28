import { useLocation, useNavigate } from 'react-router-dom'
import { BottomTabBar } from '../components'
import bottomTab from '../constants/bottomTab'
import { NavBar } from 'antd-mobile'
import { SetOutline, MoreOutline } from 'antd-mobile-icons'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetail } from '../store/actions/userAction'





const About = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const results = useSelector(state => state.userDetail)
  const { loading, user, error } = results
  console.log(user);

  const right = (
    <MoreOutline />
  )
  
  
  useEffect(() => {
    dispatch(getUserDetail('profile'))
  }, [dispatch])

  return (
    <>
      <NavBar 
        back={`哈囉~ ${user.name}`}
        right={right} 
        backArrow={false}
        style={{ background: '#fff' }}
      />
      <BottomTabBar 
        tabName={bottomTab} 
        pathname={pathname} 
        onChange={navigate}
      />
    </>
  )
}



export default About