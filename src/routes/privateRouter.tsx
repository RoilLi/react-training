import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectCurrentUser } from '../reducer/authSlice'

type PrivateRouterProps = {
  redirectPath?: string
  children: JSX.Element | null
}

export const PrivateRouter = ({
  redirectPath = '/login',
  children,
}: PrivateRouterProps) => {
  const currentUser = useSelector(selectCurrentUser)
  if (!currentUser) {
    return <Navigate to={redirectPath} replace />
  }
  return children
}
