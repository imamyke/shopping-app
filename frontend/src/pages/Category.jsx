import { NavBar, Space, Grid, SideBar, Badge } from "antd-mobile"
import { SearchOutline, MoreOutline } from "antd-mobile-icons"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import styled from 'styled-components'
import clsx from 'clsx'

const right = (
  <div style={{ fontSize: 24 }}>
    <Space style={{ '--gap': '16px' }}>
      <SearchOutline fontSize={18} />
      <MoreOutline fontSize={18} />
    </Space>
  </div>
)
const tabs = [
  {
    key: 'key1',
    title: '选项一',
    badge: Badge.dot,
  },
  {
    key: 'key2',
    title: '选项二',
    badge: '5',
  },
  {
    key: 'key3',
    title: '选项三',
    badge: '99+',
    disabled: true,
  },
]




const Category = () => {
  const navigate = useNavigate()
  const [activeKey, setActiveKey] = useState('key1')

  return (
    <StyledContainer>
      <StyledNavbarContainer>
        <NavBar back right={right} onBack={() => navigate('/')}>
          分类
        </NavBar>
      </StyledNavbarContainer>
      <Grid columns={3}>
        <Grid.Item>
          <SideBar activeKey={activeKey} onChange={setActiveKey}>
            {tabs.map(item => (
              <SideBar.Item key={item.key} title={item.title} />
            ))}
          </SideBar>
        </Grid.Item>
        <Grid.Item span={2} style={{ border: '1px solid #000' }}>
          <div>
            <StyledPage 
              className={clsx('', {active: activeKey === 'key1'})}
            >
              页面 1
            </StyledPage>
            <StyledPage 
              className={clsx('', {active: activeKey === 'key2'})}
            >
              页面 2
            </StyledPage>
            <StyledPage 
              className={clsx('', {active: activeKey === 'key3'})}
            >
              页面 3
            </StyledPage>
          </div>
        </Grid.Item>
      </Grid>
      

    </StyledContainer>
  )
}

export default Category

const StyledContainer = styled.div`
  height: 100vh;
  background-color: #ffffff;
`

const StyledPage = styled.div`
  display: none;
  &.active {
    display: flex;
  }
`
const StyledNavbarContainer = styled.div`
  .adm-nav-bar-back-arrow {
    font-size: 14px;
  }
  .adm-nav-bar-title {
    font-size: 16px;
  }
`