import Navbar from "../layout/Navbar/Navbar"
import Banner from "../layout/Banner/Banner"
import CardList from "../layout/CardList/CardList"
import Footer from "../layout/Footer/Footer"

import { useState } from "react"

const HomePage = () => {
  const [display, setDisplay] = useState(false)
  const setNavbar = () => {
    if (window.scrollY > 100) {
      setDisplay(true)
    } else {
      setDisplay(false)
    }
  } 
  window.addEventListener('scroll', setNavbar)
  return (
    <>
      <Navbar display={display} />
      <Banner />
      <CardList />
      <Footer />
    </>
  )
}

export default HomePage