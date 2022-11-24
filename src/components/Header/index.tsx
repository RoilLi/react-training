import { Col, Layout, Popover, Row, Typography } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectSidebarCollapsed, toggleSideBar } from '../../reducer/appSlice'
import { logout } from '../../reducer/authSlice'
import {
  AppTitle,
  MenuFoldOutIcon,
  MenuUnfoldOutIcon,
  UserIcon,
} from './styled'

const { Title, Text } = Typography

const Header = () => {
  const collapsed = useSelector(selectSidebarCollapsed)
  const dispatch = useDispatch()

  return (
    <Layout.Header style={{ padding: 0 }}>
      <Row>
        <Col span={20}>
          {React.createElement(
            collapsed ? MenuUnfoldOutIcon : MenuFoldOutIcon,
            {
              onClick: () => dispatch(toggleSideBar()),
            }
          )}
          <AppTitle>Ruckus React Training</AppTitle>
        </Col>
        <Col span={4} style={{ textAlign: 'right' }}>
          <Popover
            title={<Title level={5}>Hi,</Title>}
            content={
              <a onClick={() => dispatch(logout())}>
                <Text type="danger">Log Out</Text>
              </a>
            }
          >
            <UserIcon />
          </Popover>
        </Col>
      </Row>
    </Layout.Header>
  )
}

export default Header
