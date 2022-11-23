import { DashboardOutlined, TableOutlined } from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import { useSelector } from 'react-redux'
import { NavLink, useLocation } from 'react-router-dom'
import { selectSidebarCollapsed } from '../../reducer/appSlice'
import { AppLogo } from './styled'

const { Sider } = Layout

const Sidebar = () => {
  const location = useLocation()
  const collapsed = useSelector(selectSidebarCollapsed)
  const sidebarItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: <NavLink to="/dashboard">Dashboard</NavLink>,
    },
    {
      key: '/table',
      icon: <TableOutlined />,
      label: <NavLink to="/table">Table</NavLink>,
    },
  ]

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <AppLogo />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        selectedKeys={[location.pathname]}
        items={sidebarItems}
      />
    </Sider>
  )
}

export default Sidebar
