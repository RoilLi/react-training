import { Col, PageHeader, Row, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import CommonForm from '../../../components/CommonForm'
import PageContent from '../../../components/PageContent'
import { useParams } from 'react-router-dom'
import {
  Device,
  useUpdateDeviceMutation,
  useGetSpecificDeviceQuery,
} from '../../../services/deviceService'

const { Title } = Typography

const EditPage = () => {
  const navigate = useNavigate()
  const { serialNumber } = useParams()
  const { data } = useGetSpecificDeviceQuery(serialNumber)
  const [updateDevice, { isLoading }] = useUpdateDeviceMutation()

  const submit = async (data: Device) => {
    data.createTime = new Date()
    const params = {
      params: {
        serialNumber: serialNumber,
      },
      payload: data,
    }
    await updateDevice(params).unwrap()
    navigate('/table')
  }

  return (
    <PageContent>
      <PageHeader title={<Title>Edit Page</Title>} />
      <Row>
        <Col span={12}>
          <CommonForm handleFinish={submit} isLoading={isLoading} data={data} />
        </Col>
      </Row>
    </PageContent>
  )
}

export default EditPage
