require('dotenv/config')
const amqp = require('amqplib')

const QUEUE = 'fatal-error-logs-queue'
const EXCHANGE_NAME = 'direct-logs'
const EXCHANGE_TYPE = 'direct'
const PATTERN = 'tech-lead'

const startDirect = async () => {
  try {
    const connection = await amqp.connect(process.env.AMQP_URL)
    const channel = await connection.createChannel()

    await channel.assertQueue(QUEUE)
    await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE)
    await channel.bindQueue(QUEUE, EXCHANGE_NAME, PATTERN)

    console.log('[DIRECT] Waiting for logs. To exit press CTRL+C')

    channel.consume(QUEUE, (msg) => {
      const content = JSON.parse(msg.content.toString())

      console.log(`[DIRECT] Received message from ${EXCHANGE_NAME}`)
      console.log(content)

      channel.ack(msg)
    })
  } catch (error) {
    console.warn(error)
  }
}

module.exports = { startDirect }
