import { Line, Pie } from '@ant-design/plots'
import { Card, Col, Layout, Row, Typography } from 'antd'
import { StatisticCard } from '@ant-design/pro-components'
import { useEffect, useState } from 'react'

const { Content } = Layout

const { Title } = Typography

const Dashboard = () => {
  const [lineData, seLinetData] = useState([])
  const [pieData, setPieData] = useState([
    {
      type: 'On',
      value: 27,
    },
    {
      type: 'Off',
      value: 27,
    },
    {
      type: 'Processing',
      value: 27,
    },
    {
      type: 'Error',
      value: 27,
    },
  ])

  const config = {
    appendPadding: 10,
    data: pieData,
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
            value: 0,
          }}
        />
        <StatisticCard.Divider />
        <StatisticCard
          statistic={{
            title: 'On',
            value: 0,
            status: 'success',
          }}
        />
        <StatisticCard
          statistic={{
            title: 'Off',
            value: 0,
            status: 'default',
          }}
        />
        <StatisticCard
          statistic={{
            title: 'Processing',
            value: 0,
            status: 'processing',
          }}
        />
        <StatisticCard
          statistic={{
            title: 'Error',
            value: 0,
            status: 'error',
          }}
        />
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
