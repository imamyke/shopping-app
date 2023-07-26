import styled from 'styled-components'
import { Tabs, Swiper } from 'antd-mobile'
import { ScanningOutline, SetOutline } from 'antd-mobile-icons'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

// 之後 title要改children
const swiperItemsGenerate = (tab) => {
  return tab.map((item) => {
    return <Swiper.Item key={item.key}>{item.title}</Swiper.Item>
  })
}

const TopTabBar = ({ tabName, activeIndex, setActiveIndex, onChange, swiperRef, swiperTab}) => {
  const navigate = useNavigate()
  
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  return (
    <>
      <StyledTopBarHeader>
        <StyledTopBarContainer>
          <StyledSearchBar>
            <div className='searchbar-scanning-logo'>
              <ScanningOutline fontSize={24} />
            </div>
            <input type="text" placeholder='请搜寻喜欢的宝贝' />
            <div className='searchbar-button'>
              <button type='button'>搜索</button>
            </div>
          </StyledSearchBar>
          <StyledLoginIcon>
            { userInfo ? (
              <SetOutline 
                fontSize={28} 
                color='#fff'
                onClick={() => navigate('/logout')} 
              />
            ) : (
              <i 
                onClick={() => navigate('/login')}
                class="fa-regular fa-comment"
              ></i>
            )}
          </StyledLoginIcon>
        </StyledTopBarContainer>
          <div className="toptab-bar row">
            <div className="col-flex">
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
            </div>
            <div className="col">
              <Link to='/category' className="category-link">
                <i class="fa-solid fa-bars"></i> 分类
              </Link>
            </div>
          </div>
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
  background: #fb5d5a;
  padding: 16px 12px 0 12px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  .row {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .col {
    width: 15%;
  }
  .col-flex {
    width: 85%;
  }
  .category-link {
    display: block;
    text-decoration: none;
    width: 100%;
    text-align: center;
    color: #fff;
    line-height: 30px;
    background: #fb5d5a;
  }
  .adm-tabs-header {
    border-bottom: 0;
  }
`
const StyledSearchBar = styled.div`
    display: flex;
    flex: 1;
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
        background: #fb5d5a;
        border: 2px solid #fff;
        color: #fff;
        text-align: center;
      }
    }
`
const StyledTopBarContainer = styled.div`
  display: flex;
`
const StyledLoginIcon = styled.div`
  width: 36px;
  text-align: center;
  i {
    line-height: 30px;
    font-size: 28px;
    color: #fff;
  }
  svg {
    margin-top: 3px;
  }
`
const StyledSwiperContainer = styled.div`
  padding-top: 100px;
`