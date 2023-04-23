import dotenv from "dotenv"
import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from "@apollo/server/express4"
import express from "express"
import cors from "cors"
import bodyParser from "body-parser"

import { loadConfig } from "./config"
import { resolvers, typeDefs, getContext } from "./graphql"

dotenv.config()
const config = loadConfig()

async function startServer() {
  const { port } = config
  const context = await getContext(config)

  const app = express()
  const server = new ApolloServer({ typeDefs, resolvers })

  await server.start()
  app.use(cors(), bodyParser.json(), expressMiddleware(server, { context }))

  await new Promise(resolve => app.listen({ port }, resolve))
  console.log(`🚀 Server ready at :${port}`)
}

startServer()
