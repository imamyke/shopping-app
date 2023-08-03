import { useLocation, useNavigate } from 'react-router-dom'
import { BottomTabBar } from '../components'
import bottomTab from '../constants/bottomTab'
import { NavBar, TabBar } from 'antd-mobile'
import { SetOutline, MoreOutline } from 'antd-mobile-icons'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetail } from '../store/actions/userAction'
import {
  RightOutline,
  AppOutline,
  MessageOutline,
  MessageFill,
  UnorderedListOutline,
  UserOutline,
} from 'antd-mobile-icons'
import styled from 'styled-components'


const About = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const results = useSelector(state => state.userDetail)
  const { loading, user, error } = results

  const right = (
    <MoreOutline />
  )
  
  useEffect(() => {
    dispatch(getUserDetail('profile'))
  }, [dispatch])

  const tabs = [
    {
      key: 'home',
      title: '首页',
      icon: <AppOutline />,
    },
    {
      key: 'todo',
      title: '待办',
      icon: <UnorderedListOutline />,
    },
    {
      key: 'message',
      title: '消息',
      icon: <MessageFill />,
      badge: '99+',
    },
    {
      key: 'personalCenter',
      title: '我的',
      icon: <UserOutline />,
    },
  ]

  return (
    <>
      <NavBar 
        back={`哈囉~ ${user.name}`}
        right={right} 
        backArrow={false}
        style={{ background: '#fff' }}
      />
      <StyledOrderContainer>
        <div className="title">
          <h1>我的订单</h1>
          <span 
            className='all-orders'
            onClick={() => navigate('/myorders')}
          >查看全部 <RightOutline /></span>
        </div>
        <TabBar activeKey={null}>
          {tabs.map(item => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </StyledOrderContainer>
      <BottomTabBar 
        tabName={bottomTab} 
        pathname={pathname} 
        onChange={navigate}
      />
    </>
  )
}

export default About

const StyledOrderContainer = styled.div`
  background: #fff;
  margin: 10px;
  border-radius: 10px;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h1 {
      padding: 10px;
      font-weight: bold;
      font-size: 14px;
    }
    .all-orders {
      padding-right: 10px;
      color: #aaa
    }
  }
`