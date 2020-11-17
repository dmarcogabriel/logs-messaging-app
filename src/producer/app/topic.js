require('dotenv/config')
const amqp = require('amqplib')

const EXCHANGE_NAME = 'topics-logs'
const EXCHANGE_TYPE = 'topic'
const ROUTING_KEY = 'maintainer'

const startTopic = async () => {
  try {
    const connection = await amqp.connect(process.env.AMQP_URL)

    const channel = await connection.createChannel()
    await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE)

    let _id = 1 // This is a simple ID generator

    setInterval(() => {
      const msg = {
        _id,
        text: `${Date.now()} => Alerta biblioteca 'x' foi descontinuada!`,
      }

      channel.publish(EXCHANGE_NAME, ROUTING_KEY, Buffer.from(JSON.stringify(msg)))
      console.log(`[TOPIC] Sent message: , ID: ${msg._id}, TEXT: ${msg.text}`)

      _id++
    }, 15000)
  } catch (error) {
    console.warn(error)
  }
}

module.exports = { startTopic }
