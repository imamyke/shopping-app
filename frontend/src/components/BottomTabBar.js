import { TabBar } from 'antd-mobile'
import styled from 'styled-components'

const StyledBottomTabBar = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  border: 1px solid #000;
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
