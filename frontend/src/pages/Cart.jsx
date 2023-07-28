import { useLocation, useNavigate } from 'react-router-dom'
import { BottomTabBar } from '../components'
import bottomTab from '../constants/bottomTab'
import { NavBar } from 'antd-mobile'
import { MoreOutline } from 'antd-mobile-icons'

const Cart = () => {
  const { pathname } = useLocation()
  const handleNavigate = useNavigate()
  const right = (
    <MoreOutline fontSize={20} />
  )
  return (
    <div>
      <NavBar 
        back='购物车'
        right={right} 
        backArrow={false}
        style={{ background: '#fff' }}
      >
      </NavBar>
      <BottomTabBar 
        tabName={bottomTab} 
        pathname={pathname} 
        onChange={handleNavigate}
      />
    </div>
  )
}

export default Cart