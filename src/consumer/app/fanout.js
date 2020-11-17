require('dotenv/config')
const amqp = require('amqplib')

const QUEUE = 'logs-queue'
const EXCHANGE_NAME = 'fanout-logs'
const EXCHANGE_TYPE = 'fanout'

const startFanout = async () => {
  try {
    const connection = await amqp.connect(process.env.AMQP_URL)
    const channel = await connection.createChannel()

    await channel.assertQueue(QUEUE)
    await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE)
    await channel.bindQueue(QUEUE, EXCHANGE_NAME)

    console.log('[FANOUT] Waiting for logs. To exit press CTRL+C')

    channel.consume(QUEUE, (msg) => {
      const content = JSON.parse(msg.content.toString())

      console.log(`[FANOUT] Received message from ${EXCHANGE_NAME}`)
      console.log(content)

      channel.ack(msg)
    })
  } catch (error) {
    console.warn(error)
  }
}

module.exports = { startFanout }
