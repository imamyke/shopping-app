import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { BottomTabBar, TopTabBar } from '../components'
import { bottomTab, topTab } from '../constants'
import homeScreen from '../components/homeScreen'


const Home = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const swiperRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const handleChange = (key) => {
  const index = topTab.findIndex(item => item.key === key)
    setActiveIndex(index)
    swiperRef.current?.swipeTo(index)
  }
  
  
  return (
    <>
      <TopTabBar
        swiperRef={swiperRef}
        swiperTab={homeScreen}
        tabName={topTab}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        onChange={handleChange}
      />
      <BottomTabBar 
        tabName={bottomTab} 
        pathname={pathname} 
        onChange={navigate}
      />
    </>
  )
}

export default Home