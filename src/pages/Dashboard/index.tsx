import { Line, Pie } from '@ant-design/plots'
import { Card, Col, Layout, Row, Typography } from 'antd'
import { StatisticCard, StatisticProps } from '@ant-design/pro-components'
import { useEffect, useState } from 'react'
import { useGetDeviceQuery } from '../../services/deviceService'

const { Content } = Layout

const { Title } = Typography

const Dashboard = () => {
  const [lineData, seLinetData] = useState([])
  const [statisticData, setStatisticData] = useState([
    {
      type: 'on',
      value: 0,
      status: 'success',
    },
    {
      type: 'off',
      value: 0,
      status: 'default',
    },
    {
      type: 'processing',
      value: 0,
      status: 'processing',
    },
    {
      type: 'error',
      value: 0,
      status: 'error',
    },
  ])
  const { data } = useGetDeviceQuery()

  const config = {
    appendPadding: 10,
    data: statisticData,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }: any) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
    height: 200,
  }

  useEffect(() => {
    asyncFetch()
  }, [])

  useEffect(() => {
    if (data && data.length > 0) {
      let onCount = 0
      let offCount = 0
      let processingCount = 0
      let errorCount = 0
      for (let item of data) {
        switch (item.status) {
          case 'on':
            onCount++
            break
          case 'off':
            offCount++
            break
          case 'processing':
            processingCount++
            break
          case 'error':
            errorCount++
            break
        }
      }
      setStatisticData([
        {
          type: 'on',
          value: onCount,
          status: 'success',
        },
        {
          type: 'off',
          value: offCount,
          status: 'default',
        },
        {
          type: 'processing',
          value: processingCount,
          status: 'processing',
        },
        {
          type: 'error',
          value: errorCount,
          status: 'error',
        },
      ])
    }
  }, [data])

  const asyncFetch = () => {
    fetch(
      'https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json'
    )
      .then((response) => response.json())
      .then((json) => seLinetData(json))
      .catch((error) => {
        console.log('fetch data failed', error)
      })
  }

  return (
    <Content
      style={{
        margin: '24px 16px',
        padding: 24,
        minHeight: 280,
      }}
    >
      <Title>Dashboard</Title>
      <StatisticCard.Group>
        <StatisticCard
          statistic={{
            title: 'All',
            value: statisticData.reduce(
              (partialSum, item) => partialSum + item.value,
              0
            ),
          }}
        />
        <StatisticCard.Divider />
        {statisticData.map((item) => (
          <StatisticCard
            statistic={{
              title: item.type,
              value: item.value,
              status: item.status as StatisticProps['status'],
            }}
          />
        ))}
      </StatisticCard.Group>
      <Row style={{ marginTop: '24px' }} gutter={32}>
        <Col span={15}>
          <Card title="Traffic Flow">
            <Line
              data={lineData}
              padding="auto"
              xField="Date"
              yField="scales"
              height={520}
              xAxis={{ tickCount: 5 }}
            />
          </Card>
        </Col>
        <Col span={9}>
          <Card title="Device Status">
            <Pie {...config} />
          </Card>
        </Col>
      </Row>
    </Content>
  )
}

export default Dashboard
