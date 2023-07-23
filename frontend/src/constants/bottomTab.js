import {
  AppOutline,
  MessageOutline,
  UnorderedListOutline,
  UserOutline,
} from 'antd-mobile-icons'

const bottomTab = [
  {
    key: '/',
    title: '首页',
    icon: <AppOutline />
  },
  {
    key: '/video',
    title: '视频',
    icon: <UnorderedListOutline />
  },
  {
    key: '/cart',
    title: '购物车',
    icon: <MessageOutline />
  },
  {
    key: '/about',
    title: '我的',
    icon: <UserOutline />
  }
]

export default bottomTab