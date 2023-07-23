import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useRef } from 'react'
import { BottomTabBar } from '../components'
import { Tabs, Swiper } from 'antd-mobile'
import { ScanningOutline } from 'antd-mobile-icons'
import { bottomTab, topTab } from '../constants'
import styled from 'styled-components'

const StyledTopBarHeader = styled.header`
  background: #AA1803;
  padding: 16px 12px 0 12px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`
const StyledSearchBar = styled.div`
    display: flex;
    background: #fff;
    border-radius: 16px;
    text-align: center;
    padding-left: 8px;
    .searchbar-scanning-logo {
      width: 30px;
      align-self: center;
      color: #9E9B98;
    }
    input {
      display: block;
      line-height: 30px;
      flex: 1;
      padding: 0 4px;
      border: 0;
      &:focus {
        outline: 0;
      }
    }
    .searchbar-button {
      width: 60px;
      button {
        font-weight: bold;
        width: 100%;
        line-height: 30px;
        border-radius: 16px;
        background: #AA1803;
        border: 2px solid #fff;
        color: #fff;
        text-align: center;
      }
    }
`
const StyledSwiperContainer = styled.div`
  padding-top: 100px;
`

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
      <StyledTopBarHeader>
        <StyledSearchBar>
          <div className='searchbar-scanning-logo'>
            <ScanningOutline fontSize={24} />
          </div>
          <input type="text" placeholder='请搜寻喜欢的宝贝' />
          <div className='searchbar-button'>
            <button type='button'>搜索</button>
          </div>
        </StyledSearchBar>
        <Tabs 
          activeKey={topTab[activeIndex].key}
          onChange={key => handleChange(key)}
          activeLineMode='fixed'
          style={{
            '--title-font-size': '13px',
            '--active-title-color': '#F4F3EE',
            '--active-line-color': '#F4F3EE',
            '--fixed-active-line-width': '15px',
            '--content-padding': '10px',
            color: '#fff',
          }}
        >
          {topTab.map(tab => 
            <Tabs.Tab {...tab}></Tabs.Tab>  
          )}
        </Tabs>
      </StyledTopBarHeader>

      <StyledSwiperContainer>
        <Swiper
          direction='horizontal'
          loop
          indicator={() => null}
          ref={swiperRef}
          defaultIndex={activeIndex}
          onIndexChange={index => {
            setActiveIndex(index)
          }}
        >
          <Swiper.Item>
          <div>2</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>2</div>
            <div>2</div>
            <div>2</div>
            <div>2</div>
            <div>2</div>
            <div>2</div>
            <div>2</div>
            <div>2</div>
            <div>2</div>
            <div>2</div>
            <div>2</div>
            <div>2</div>
            <div>2</div>
            <div>2</div>
            <div>2</div>
            <div>2</div>
            <div>2</div>
            <div>2</div>
            <div>2</div>

            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
          </Swiper.Item>
          <Swiper.Item>
            <div>2</div>
          </Swiper.Item>
          <Swiper.Item>
            <div>3</div>
          </Swiper.Item>
          <Swiper.Item>
            <div>4</div>
          </Swiper.Item>
          <Swiper.Item>
            <div>5</div>
          </Swiper.Item>
          <Swiper.Item>
            <div>6</div>
          </Swiper.Item>
          <Swiper.Item>
            <div>7</div>
          </Swiper.Item>
        </Swiper>
      </StyledSwiperContainer>
      <BottomTabBar 
        tabName={bottomTab} 
        pathname={pathname} 
        onChange={handleNavigate}
      />
    </>
  )
}

export default Home