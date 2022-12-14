import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/Layout'
import Dashboard from '../pages/Dashboard'
import Login from '../pages/Login'
import Table from '../pages/Table'
import AddPage from '../pages/Table/AddPage'
import { PrivateRouter } from './privateRouter'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'dashboard',
        element: (
          <PrivateRouter>
            <Dashboard />
          </PrivateRouter>
        ),
      },
      {
        path: 'table',
        element: (
          <PrivateRouter>
            <Table />
          </PrivateRouter>
        ),
      },
      {
        path: 'table/add',
        element: (
          <PrivateRouter>
            <AddPage />
          </PrivateRouter>
        ),
      },
    ],
  },
])

export default routes
