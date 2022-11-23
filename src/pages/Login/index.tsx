import { Button, Checkbox, Form, Input, Card } from 'antd'
import { useLoginMutation } from '../../services/authService'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const [login, { isLoading }] = useLoginMutation()
  const onFinish = async (formData: any) => {
    try {
      await login(formData).unwrap()
      navigate('/dashboard')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Card title="Login" style={{ margin: 'auto', minWidth: '600px' }}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default Login
