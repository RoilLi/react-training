import { Line, Pie } from '@ant-design/plots'
import { StatisticCard, StatisticProps } from '@ant-design/pro-components'
import { Card, Col, Layout, Row, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { Device } from '../../services/deviceService'

const { Content } = Layout

const { Title } = Typography

const defaulStatistic = [
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
]

const transFormData = (data: Device[] | undefined) => {
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
    return [
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
    ]
  } else {
    console.log(data)
    return defaulStatistic
  }
}

const Dashboard = () => {
  const [lineData, seLinetData] = useState([])

  const config = {
    appendPadding: 10,
    data: defaulStatistic,
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
            value: defaulStatistic.reduce(
              (partialSum, item) => partialSum + item.value,
              0
            ),
          }}
        />
        <StatisticCard.Divider />
        {defaulStatistic.map((item) => (
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
