// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })

// Declare a route
fastify.get('/app', async (request, reply) => {
  return { hello: "hello world" }
})

// Run the server!
const start = async () => {
  try {
    await fastify.listen({ host: "127.0.0.1", port: 5050 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
