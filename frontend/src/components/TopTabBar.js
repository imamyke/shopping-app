import styled from 'styled-components'
import { Tabs, Swiper } from 'antd-mobile'
import { ScanningOutline } from 'antd-mobile-icons'

// 之後 title要改children
const swiperItemsGenerate = (tab) => {
  tab.map((item) => {
    return <Swiper.Item key={item.key}>{item.title}</Swiper.Item>
  })
}

const TopTabBar = ({ tabName, activeIndex, setActiveIndex, onChange, swiperRef, swiperTab}) => {

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
          activeKey={tabName[activeIndex].key}
          onChange={key => onChange(key)}
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
          {tabName.map(tab => 
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
          {swiperItemsGenerate(swiperTab)}
        </Swiper>
      </StyledSwiperContainer>
    </>
  )
}

export default TopTabBar

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