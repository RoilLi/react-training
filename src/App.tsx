import { Layout } from 'antd'
import { RouterProvider } from 'react-router-dom'
import './App.css'
import routes from './routes/root'

const App = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <RouterProvider router={routes} />
    </Layout>
  )
}

export default App
