import { faker } from '@faker-js/faker'
import { factory, primaryKey } from '@mswjs/data'

export const db = factory({
  // A 'task' model that describes what properties
  // each task has.
  device: {
    id: primaryKey(faker.datatype.uuid),
    name: faker.random.words,
    serialNumber: faker.random.words,
    status: faker.random.words,
    createTime: faker.date.future
  },
})

// The default tasks created each time you refresh the page.
db.device.create({ name: 'device1', serialNumber: '0000000001', status: 'on', createTime: new Date() })
db.device.create({ name: 'device2', serialNumber: '0000000002', status: 'on', createTime: new Date() })
db.device.create({ name: 'device3', serialNumber: '0000000003', status: 'on', createTime: new Date() })
db.device.create({ name: 'device4', serialNumber: '0000000004', status: 'on', createTime: new Date() })
db.device.create({ name: 'device5', serialNumber: '0000000005', status: 'on', createTime: new Date() })
db.device.create({ name: 'device6', serialNumber: '0000000006', status: 'on', createTime: new Date() })
db.device.create({ name: 'device7', serialNumber: '0000000007', status: 'on', createTime: new Date() })
db.device.create({ name: 'device8', serialNumber: '0000000008', status: 'on', createTime: new Date() })
db.device.create({ name: 'device9', serialNumber: '0000000009', status: 'on', createTime: new Date() })
db.device.create({ name: 'device10', serialNumber: '0000000010', status: 'on', createTime: new Date() })
