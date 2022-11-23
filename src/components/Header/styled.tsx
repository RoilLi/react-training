import styled, { css } from 'styled-components'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons'

export const AppTitle = styled.span`
  color: #fff;
  font-size: 23px;
  font-weight: bold;
`

const trigger = css`
  padding: 0 24px;
  font-size: 18px;
  line-height: 64px;
  cursor: pointer;
  transition: color 0.3s;
  color: #fff;
  &:hover {
    color: #1890ff;
  }
`

export const MenuFoldOutIcon = styled(MenuFoldOutlined)`
  ${trigger}
`

export const MenuUnfoldOutIcon = styled(MenuUnfoldOutlined)`
  ${trigger}
`

export const UserIcon = styled(UserOutlined)`
  ${trigger}
`
