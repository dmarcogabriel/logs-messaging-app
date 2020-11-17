require('dotenv/config')
const amqp = require('amqplib')

const EXCHANGE_NAME = 'fanout-logs'
const EXCHANGE_TYPE = 'fanout'
const ROUTING_KEY = ''

const startFanout = async () => {
  try {
    const connection = await amqp.connect(process.env.AMQP_URL)

    const channel = await connection.createChannel()
    await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE)

    let _id = 1 // This is a simple ID generator

    setInterval(() => {
      const msg = {
        _id,
        text: `${Date.now()} => Este é um log de acesso!`,
      }

      channel.publish(EXCHANGE_NAME, ROUTING_KEY, Buffer.from(JSON.stringify(msg)))
      console.log(`[FANOUT] Sent message: , ID: ${msg._id}, TEXT: ${msg.text}`)

      _id++
    }, 5000)
  } catch (error) {
    console.warn(error)
  }
}

module.exports = { startFanout }
