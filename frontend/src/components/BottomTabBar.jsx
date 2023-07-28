import { TabBar } from 'antd-mobile'
import styled from 'styled-components'

const StyledBottomTabBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: #ffffff;
  .adm-tab-bar-item {
    color: #453C41;
  }
  .adm-tab-bar-item-active {
    color: #fb5d5a;
    font-weight: bold;
  }
`

const BottomTabBar = ({ tabName, pathname, onChange }) => {
  return (
  <StyledBottomTabBar>
    <TabBar activeKey={pathname} onChange={value => onChange(value)}>
      {tabName.map(item => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  </StyledBottomTabBar>
  )
}

export default BottomTabBar
