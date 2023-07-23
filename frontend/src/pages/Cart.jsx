import { useLocation, useNavigate } from 'react-router-dom'
import { BottomTabBar } from '../components'
import bottomTab from '../constants/bottomTab'

const Cart = () => {
  const { pathname } = useLocation()
  const handleNavigate = useNavigate()

  return (
    <div>
      Cart
      <BottomTabBar 
        tabName={bottomTab} 
        pathname={pathname} 
        onChange={handleNavigate}
      />
    </div>
  )
}

export default Cart