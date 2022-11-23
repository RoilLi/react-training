import { Layout } from 'antd'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { selectCurrentUser } from '../../reducer/authSlice'
import Header from '../Header'
import Sidebar from '../Sidebar'

const AppLayout = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const currentUser = useSelector(selectCurrentUser)

  useEffect(() => {
    if (location.pathname === '/') {
      if (currentUser) {
        navigate('/dashboard')
      } else {
        navigate('/login')
      }
    }
  })

  return (
    <>
      {currentUser ? (
        <>
          <Sidebar />
          <Layout>
            <Header />
            <Outlet />
          </Layout>
        </>
      ) : (
        <Layout>
          <Outlet />
        </Layout>
      )}
    </>
  )
}

export default AppLayout
