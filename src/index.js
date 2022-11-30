// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })
// Require fs for readStream
const { createReadStream } = require('fs')

// Declare a route
fastify.get('/', async (request, reply) => {
  // return reply of stream of index.html
  return reply.type("text/html")
    .send(createReadStream("./html/index.html"))
})

// Run the server!
const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
