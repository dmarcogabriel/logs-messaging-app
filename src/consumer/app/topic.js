require('dotenv/config')
const amqp = require('amqplib')

const QUEUE = 'warning-logs-queue'
const EXCHANGE_NAME = 'topics-logs'
const EXCHANGE_TYPE = 'topic'
const PATTERN = 'maintainer'

const startTopic = async () => {
  try {
    const connection = await amqp.connect(process.env.AMQP_URL)
    const channel = await connection.createChannel()

    await channel.assertQueue(QUEUE)
    await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE)
    await channel.bindQueue(QUEUE, EXCHANGE_NAME, PATTERN)

    console.log('[TOPIC] Waiting for warnings logs. To exit press CTRL+C')

    channel.consume(QUEUE, (msg) => {
      const content = JSON.parse(msg.content.toString())

      console.log(`[TOPIC] Received message from ${EXCHANGE_NAME}`)
      console.log(content)

      channel.ack(msg)
    })
  } catch (error) {
    console.warn(error)
  }
}

module.exports = { startTopic }
