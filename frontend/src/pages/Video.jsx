import { useLocation, useNavigate } from 'react-router-dom'
import { BottomTabBar } from '../components'
import bottomTab from '../constants/bottomTab'

const Video = () => {
  const { pathname } = useLocation()
  const handleNavigate = useNavigate()

  return (
    <div>
      Video
      <BottomTabBar 
        tabName={bottomTab} 
        pathname={pathname} 
        onChange={handleNavigate}
      />
    </div>
  )
}

export default Video