import { useLocation, useNavigate, Link } from 'react-router-dom'
import { BottomTabBar, Loader } from '../components'
import bottomTab from '../constants/bottomTab'
import { NavBar, Grid, Avatar } from 'antd-mobile'
import { SetOutline, MoreOutline } from 'antd-mobile-icons'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetail } from '../store/actions/userAction'

import {
  RightOutline,
  AppOutline,
  MessageFill,
  UnorderedListOutline,
  UserOutline,
  ReceivePaymentOutline,
  UserContactOutline,
  BellOutline,
  GiftOutline,
  GlobalOutline,
  HistogramOutline,
  FlagOutline
} from 'antd-mobile-icons'
import styled from 'styled-components'


const About = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const results = useSelector(state => state.userDetail)
  const { user } = results
  const products = useSelector(state => state.productList)
  const { loading, productList } = products
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const right = (
    <MoreOutline />
  )
  
  useEffect(() => {
    if (!userInfo) {
      navigate('/')
    } else {
      if (!user || !user.name) {
        dispatch(getUserDetail('profile'))
      }
    }
  }, [userInfo, navigate, dispatch, user])
  
  const walletTabs = [
    {
      key: 'home',
      title: '京豆',
      value: 7,
      text: '领更多京豆'
    },
    {
      key: 'todo',
      title: '红包',
      value: 0.00,
      text: '购物折抵'
    },
    {
      key: 'message',
      title: '优惠券',
      value: 0,
      text: '下单立省'
    },
    {
      key: 'personalCenter',
      title: '白条',
      value: 80.00,
      text: '领无门坎券'
    },
  ]
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
    },
    {
      key: 'personalCenter',
      title: '我的',
      icon: <UserOutline />,
    },
  ]
  const serviceTabs = [
    {
      key: '1',
      title: '天天领红包',
      icon: <ReceivePaymentOutline />,
      color: '#f74638'
    },
    {
      key: '2',
      title: '东东农场',
      icon: <GlobalOutline />,
      color: '#57ce53'
    },
    {
      key: '3',
      title: '签到领豆',
      icon: <HistogramOutline />,
      color: '#f97e95'
    },
    {
      key: '4',
      title: '摇钱树',
      icon: <BellOutline />,
      color: '#f6c459'
    },
    {
      key: '5',
      title: '汪汪乐园',
      icon: <AppOutline />,
      color: '#f77777'
    },
    {
      key: '6',
      title: '客户服务',
      icon: <UnorderedListOutline />,
      color: '#50b0fa'
    },
    {
      key: '7',
      title: 'PLUS会员',
      icon: <MessageFill />,
      color: '#f8de6f'
    },
    {
      key: '8',
      title: '充值中心',
      icon: <GiftOutline />,
      color: '#fa4e5e'
    },
    {
      key: '9',
      title: '问医生',
      icon: <UserContactOutline />,
      color: '#7bd8bd'
    },
    {
      key: '10',
      title: '京东新品',
      icon: <FlagOutline />,
      color: '#f3ab48'
    },
  ]

  return (
    <>
      <NavBar 
        backArrow={false}
        style={{ background: '#fff' }}
      >我的</NavBar>
      <div style={{ padding: '0 10px' }}>
        <StyledTabContainer>
          <div className="title">
            <h1>我的钱包</h1>
            <span 
              className='more'
              onClick={() => navigate('/myorders')}
            >查看全部 <RightOutline /></span>
          </div>
          <StyledIconTabs width="25%">
            {walletTabs.map((item, idx) => (
              <div key={idx} className='border-right item'>
                <div className="value">{item.value}</div>
                <p className="title">{item.title}</p>
                <span className="text">{item.text}</span>
              </div>
            )) }
          </StyledIconTabs>
        </StyledTabContainer>
        <StyledTabContainer>
          <div className="title">
            <h1>我的订单</h1>
            <span 
              className='more'
              onClick={() => navigate('/myorders')}
            >查看全部 <RightOutline /></span>
          </div>
          <StyledIconTabs width="25%">
            {tabs.map((item, idx) => (
              <div key={idx} className='item'>
                <div className="icon">{item.icon}</div>
                <p className="title">{item.title}</p>
              </div>
            )) }
          </StyledIconTabs>
        </StyledTabContainer>
        <StyledTabContainer style={{ padding: 10 }}>
          <StyledIconTabs width="20%">
          {serviceTabs.map((item, idx) => (
            <StyledItem key={idx} className='item' color={item.color}>
              <div className="icon">{item.icon}</div>
              <p className="title">{item.title}</p>
            </StyledItem>
          ))}
          </StyledIconTabs>
        </StyledTabContainer>
        {loading ? <Loader /> : (
          <Grid columns={2} gap={10} style={{ marginBottom: 60 }}>
            {productList.map(product => (
              <Grid.Item span={1}>
                <ProductCard 
                  image={product.image} 
                  name={product.name} 
                  price={product.price} 
                  url={`/product/${product._id}`}
                />
              </Grid.Item>
            ))}
          </Grid>
        )}
      </div>

      <BottomTabBar 
        tabName={bottomTab} 
        pathname={pathname} 
        onChange={navigate}
      />
    </>
  )
}

export default About
const StyledItem = styled.div`
  .icon {
    color: ${props => props.color}
  }
`
const StyledIconTabs = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  text-align: center;
  .item {
    position: relative;
    width: ${props => props.width};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #666;
  }
  .icon, .value {
    font-size: 24px;
  }
  .icon {
    margin-bottom: 4px;
  }
  .value {
    margin-bottom: 8px;
  }
  .title {
    font-size: 12px;
    margin-bottom: 4px;
  }
  .text {
    font-size: 10px;
    color: #888;
  }
  .border-right::before {
    display: block;
    content: '';
    width: 1px;
    height: 20px;
    background: #eee;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
  }
  .border-right:last-child::before {
    width: 0;
  }
`
const StyledTabContainer = styled.div`
  background: #fff;
  border-radius: 10px;
  padding-bottom: 10px;
  margin: 10px 0;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h1 {
      padding: 10px;
      font-weight: bold;
      font-size: 14px;
    }
    .more {
      padding-right: 10px;
      color: #aaa;
    }
  }
`
const ProductCard = ({ image, name, price, url }) => {
  return (
    <StyledProductCard image={image}>
      <div className='image-container'>
        <div className="image"></div>
      </div>
      <div className="card-content">
        <p className="card-title">
          {name}
        </p>
        <div className="card-price">
          ￥<span className="price">{price}</span>
        </div>
      </div>
    </StyledProductCard>
  )
}
const StyledProductCard = styled.div`
  border-radius: 10px;
  overflow: hidden;
  display: block;
  background-color: #fff;
  width: 100%;
  .image-container {
    position: relative;
    width: 100%;
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
    background-image: ${props => `url(${props.image})`};
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  .card-content {
    padding: 10px;
    .card-title {
      height: 32px;
      line-height: 16px;
      text-align: left;
      color: rgb(102, 102, 102);
      word-break: break-all;
      overflow: hidden;
      text-overflow: ellipsis;
      letter-spacing: 1px;
    }
    .card-price {
      display: block;
      font-weight: bold;
      margin-top: 10px;
      color: rgb(225, 37, 27);
      .price {
        font-size: 14px;
      }
    }
  }
`
