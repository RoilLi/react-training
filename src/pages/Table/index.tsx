import { ProColumns, ProTable } from '@ant-design/pro-components'
import { Button, PageHeader, Typography, ConfigProvider } from 'antd'
import enUS from 'antd/lib/locale/en_US'
import { useNavigate } from 'react-router-dom'
import PageContent from '../../components/PageContent'
import { Device, useGetDeviceQuery } from '../../services/deviceService'

const { Title } = Typography

const Table = () => {
  const navigate = useNavigate()
  const columns: ProColumns<Device>[] = [
    {
      title: 'Device Name',
      dataIndex: 'name',
      search: false,
      render: (data, row) => (
        <a onClick={() => navigate(`/table/${row.serialNumber}/edit`)}>
          {data}
        </a>
      ),
    },
    {
      title: 'Serial Number',
      dataIndex: 'serialNumber',
      search: false,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      search: false,
    },
    {
      title: 'Create Time',
      dataIndex: 'createTime',
      search: false,
    },
  ]

  const { data } = useGetDeviceQuery()

  return (
    <PageContent>
      <PageHeader
        title={<Title>Table</Title>}
        extra={[
          <Button key="1" type="primary" onClick={() => navigate('add')}>
            Add
          </Button>,
        ]}
      />
      <ConfigProvider locale={enUS}>
        <ProTable<Device>
          columns={columns}
          rowKey="serialNumber"
          pagination={{
            pageSize: 10,
          }}
          search={false}
          dateFormatter="string"
          toolBarRender={false}
          dataSource={data}
        />
      </ConfigProvider>
    </PageContent>
  )
}

export default Table
