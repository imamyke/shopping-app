import { useLocation, useNavigate } from 'react-router-dom'
import { BottomTabBar } from '../components'
import bottomTab from '../constants/bottomTab'



const About = () => {
  const { pathname } = useLocation()
  const handleNavigate = useNavigate()
  
  return (
    <>
      About
      <BottomTabBar 
        tabName={bottomTab} 
        pathname={pathname} 
        onChange={handleNavigate}
      />
    </>
  )
}



export default About