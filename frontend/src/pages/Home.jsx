import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useRef } from 'react'
import { BottomTabBar, TopTabBar } from '../components'
import { bottomTab, topTab } from '../constants'


const Home = () => {
  const { pathname } = useLocation()
  const handleNavigate = useNavigate()
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
        swiperTab={topTab}
        tabName={topTab}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        onChange={handleChange}
      />
      <BottomTabBar 
        tabName={bottomTab} 
        pathname={pathname} 
        onChange={handleNavigate}
      />
    </>
  )
}

export default Home