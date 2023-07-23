import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { BottomTabBar } from '../components'
import bottomTab from '../constants/bottomTab'


const Home = () => {
  const { pathname } = useLocation()
  const handleNavigate = useNavigate()

  return (
    <>
      <BottomTabBar 
        tabName={bottomTab} 
        pathname={pathname} 
        onChange={handleNavigate}
      />
    </>
  )
}

export default Home