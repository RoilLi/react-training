import { Col, PageHeader, Row, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import CommonForm from '../../../components/CommonForm'
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
          <CommonForm handleFinish={submit} isLoading={isLoading} />
        </Col>
      </Row>
    </PageContent>
  )
}

export default AddPage
