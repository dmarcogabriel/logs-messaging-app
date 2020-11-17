require('dotenv/config')
const amqp = require('amqplib')

const EXCHANGE_NAME = 'direct-logs'
const EXCHANGE_TYPE = 'direct'
const ROUTING_KEY = 'tech-lead'

const startDirect = async () => {
  try {
    const connection = await amqp.connect(process.env.AMQP_URL)

    const channel = await connection.createChannel()
    await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE)

    let _id = 1 // This is a simple ID generator

    setInterval(() => {
      const msg = {
        _id,
        text: `${Date.now()} => Fatal error related!`,
      }

      channel.publish(EXCHANGE_NAME, ROUTING_KEY, Buffer.from(JSON.stringify(msg)))
      console.log(`[DIRECT] Sent message: , ID: ${msg._id}, TEXT: ${msg.text}`)

      _id++
    }, 30000)
  } catch (error) {
    console.warn(error)
  }
}

module.exports = { startDirect }
