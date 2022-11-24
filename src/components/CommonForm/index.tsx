import { Button, Form, FormInstance, Input, Select, Space } from 'antd'
import { useNavigate } from 'react-router-dom'
import { Device } from '../../services/deviceService'
import { useEffect, useRef } from 'react'

type CommonFormProps = {
  handleFinish: ((values: any) => void) | undefined
  isLoading?: boolean
  data?: Device
}

const CommonForm = (props: CommonFormProps) => {
  const navigate = useNavigate()
  const formRef = useRef<FormInstance<Device>>(null)

  useEffect(() => {
    console.log(formRef)
    formRef.current?.setFieldsValue({
      name: props.data?.name,
      serialNumber: props.data?.serialNumber,
      status: props.data?.status,
    })
  }, [props.data])

  return (
    <Form
      ref={formRef}
      name="wrap"
      labelCol={{ flex: '110px' }}
      labelAlign="left"
      labelWrap
      wrapperCol={{ flex: 1 }}
      colon={false}
      onFinish={props.handleFinish}
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
        rules={[{ required: true, message: 'Please enter Serial Number' }]}
      >
        <Input disabled={!!props.data} />
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
          <Button type="primary" htmlType="submit" loading={props.isLoading}>
            Submit
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )
}

export default CommonForm
