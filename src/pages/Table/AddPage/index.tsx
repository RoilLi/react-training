import {
  Button,
  Col,
  Form,
  Input,
  PageHeader,
  Row,
  Typography,
  Space,
  Select,
} from 'antd'
import { useNavigate } from 'react-router-dom'
import PageContent from '../../../components/PageContent'
import { Device, useAddDeviceMutation } from '../../../services/deviceService'

const { Title } = Typography

const AddPage = () => {
  const navigate = useNavigate()
  const [addDevice, { isLoading }] = useAddDeviceMutation()

  const submit = async (data: Device) => {
    data.createTime = new Date()
    await addDevice(data).unwrap()
    navigate('/table')
  }

  return (
    <PageContent>
      <PageHeader title={<Title>Add Page</Title>} />
      <Row>
        <Col span={12}>
          <Form
            name="wrap"
            labelCol={{ flex: '110px' }}
            labelAlign="left"
            labelWrap
            wrapperCol={{ flex: 1 }}
            colon={false}
            onFinish={submit}
          >
            <Form.Item
              label="Device Name"
              name="name"
              rules={[{ required: true, message: 'Please enter Device Name' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Serial Number"
              name="serialNumber"
              rules={[
                { required: true, message: 'Please enter Serial Number' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Status"
              name="status"
              rules={[{ required: true, message: 'Please enter Status' }]}
            >
              <Select>
                <Select.Option key={1} value="on">
                  On
                </Select.Option>
                <Select.Option key={2} value="off">
                  Off
                </Select.Option>
                <Select.Option key={3} value="processing">
                  Processing
                </Select.Option>
                <Select.Option key={4} value="error">
                  Error
                </Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label=" ">
              <Space>
                <Button onClick={() => navigate('/table')}>Cancel</Button>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                  Submit
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </PageContent>
  )
}

export default AddPage
