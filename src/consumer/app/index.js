const { startFanout } = require('./fanout')
const { startDirect } = require('./direct')
const { startTopic } = require('./topic')

const exchangeFunctions = {
  fanout: startFanout,
  direct: startDirect,
  topic: startTopic,
}

const startConsumer = async () => {
  const exchange = process.env.EXCHANGE

  if (exchange) {
    await exchangeFunctions[exchange]()
  } else {
    await startFanout()
    await startDirect()
    await startTopic()
  }
}

startConsumer()
