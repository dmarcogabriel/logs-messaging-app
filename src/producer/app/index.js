const { startDirect } = require('./direct')
const { startTopic } = require('./topic')
const { startFanout } = require('./fanout')

const startApp = async () => {
  await startDirect()
  await startTopic()
  await startFanout()
}

startApp()
